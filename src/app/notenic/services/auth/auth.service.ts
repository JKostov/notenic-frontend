import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ForgotPasswordModel, LoginModel, LoginSuccessModel, RegisterModel, ResetPasswordModel } from '@notenic/auth/models/index';
import { User } from '@notenic/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieHelper } from '@notenic/helpers/cookie.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static AuthToken = 'AUTH_TOKEN';
  public static AuthUser = 'AUTH_USER';

  constructor(private http: HttpClient) { }

  static saveUserInLocalStorage(loginSuccessModel: LoginSuccessModel): void {
    localStorage.setItem(AuthService.AuthToken, loginSuccessModel.token);
    localStorage.setItem(AuthService.AuthUser, JSON.stringify(loginSuccessModel.user));

    const jwtService = new JwtHelperService();
    const expire = jwtService.getTokenExpirationDate(loginSuccessModel.token);
    CookieHelper.set(this.AuthToken, loginSuccessModel.token, expire);
  }

  static updateUserInLocalStorage(user: User): void {
    localStorage.setItem(AuthService.AuthUser, JSON.stringify(user));
  }

  static clearLocalStorage(): void {
    localStorage.removeItem(AuthService.AuthToken);
    localStorage.removeItem(AuthService.AuthUser);
    CookieHelper.delete(this.AuthToken);
  }

  static getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem(AuthService.AuthUser));
  }

  static getValidTokenFromLocalStorageOrClear(): string {
    const jwtService = new JwtHelperService();
    const token = localStorage.getItem(AuthService.AuthToken);

    const isExpired = jwtService.isTokenExpired(token);

    if (isExpired) {
      AuthService.clearLocalStorage();
      return null;
    }
    return token;
  }

  login(loginData: LoginModel): Observable<LoginSuccessModel> {
    const url = `${environment.apiUrl}/auth/login`;

    return this.http.post<LoginSuccessModel>(url, loginData);
  }

  register(registerData: RegisterModel): Observable<void> {
    const url = `${environment.apiUrl}/auth/register`;

    return this.http.post<any>(url, registerData);
  }

  verifyEmail(token: string): Observable<void> {
    const url = `${environment.apiUrl}/auth/verify-email`;

    return this.http.post<any>(url, { token });
  }

  requestPasswordReset(forgotPasswordModel: ForgotPasswordModel): Observable<void> {
    const url = `${environment.apiUrl}/auth/forgot-password`;

    return this.http.post<any>(url, forgotPasswordModel);
  }

  resetPassword(resetPasswordModel: ResetPasswordModel): Observable<void> {
    const url = `${environment.apiUrl}/auth/reset-password`;

    return this.http.post<any>(url, resetPasswordModel);
  }
}
