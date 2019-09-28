import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ForgotPasswordModel, LoginModel, LoginSuccessModel, RegisterModel, ResetPasswordModel } from '@notenic/auth/models/index';
import { User } from '@notenic/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static AuthToken = 'AUTH_TOKEN';
  public static AuthUser = 'AUTH_USER';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public saveUserInLocalStorage(loginSuccessModel: LoginSuccessModel): void {
    localStorage.setItem(AuthService.AuthToken, loginSuccessModel.token);
    localStorage.setItem(AuthService.AuthUser, JSON.stringify(loginSuccessModel.user));

    const jwtService = new JwtHelperService();
    const expire = jwtService.getTokenExpirationDate(loginSuccessModel.token);
    this.cookieService.set(AuthService.AuthToken, loginSuccessModel.token, expire);
    if (environment.production) {
      this.cookieService.set(AuthService.AuthToken, loginSuccessModel.token, expire, '/', environment.domain, environment.secureCookie);
    } else {
      this.cookieService.set(AuthService.AuthToken, loginSuccessModel.token, expire);
    }
  }

  public updateUserInLocalStorage(user: User): void {
    localStorage.setItem(AuthService.AuthUser, JSON.stringify(user));
  }

  public clearLocalStorage(): void {
    localStorage.removeItem(AuthService.AuthToken);
    localStorage.removeItem(AuthService.AuthUser);
    if (environment.production) {
      this.cookieService.delete(AuthService.AuthToken);
    } else {
      this.cookieService.delete(AuthService.AuthToken, '/', environment.domain);
    }
  }

  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem(AuthService.AuthUser));
  }

  public getValidTokenFromLocalStorageOrClear(): string {
    const jwtService = new JwtHelperService();
    const token = localStorage.getItem(AuthService.AuthToken);

    const isExpired = jwtService.isTokenExpired(token);

    if (isExpired) {
      this.clearLocalStorage();
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
