import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as authActions from './auth.actions';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ForgotPasswordModel, LoginModel, LoginSuccessModel, RegisterModel, ResetPasswordModel } from '../models/index';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidationHelper } from '@app/shared/helpers/validation.helper';
import {FollowUser, UpdateUser} from '@notenic/models';
import {UserService} from '@notenic/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {

  @Effect()
  initLoginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.InitLogin>(authActions.ActionsEnum.InitLogin),
    map((action: authActions.InitLogin) => action.payload.loginModel),
    exhaustMap((loginModel: LoginModel) =>
      this.authService.login(loginModel).pipe(
        map((loginSuccessModel: LoginSuccessModel) => (new authActions.LoginSuccess({ loginSuccessModel }))),
        catchError((response: HttpErrorResponse) => of(new authActions.LoginFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccessRecipesEffect$ = this.actions$.pipe(
    ofType<authActions.LoginSuccess>(authActions.ActionsEnum.LoginSuccess),
    map((action: authActions.LoginSuccess) => action.payload.loginSuccessModel),
    tap(loginSuccessModel => this.router.navigate(['/'])
      && AuthService.saveUserInLocalStorage(loginSuccessModel)),
  );

  @Effect()
  initRegisterEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.InitRegister>(authActions.ActionsEnum.InitRegister),
    map((action: authActions.InitRegister) => action.payload.registerModel),
    exhaustMap((registerModel: RegisterModel) =>
      this.authService.register(registerModel).pipe(
        map(() => (new authActions.RegisterSuccess({ info: 'Confirm email address to finish the registration.' }))),
        catchError((response: HttpErrorResponse) => of(new authActions.RegisterFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message),
        })))
      )
    )
  );

  @Effect({ dispatch: false })
  registerSuccessRecipesEffect$ = this.actions$.pipe(
    ofType<authActions.RegisterSuccess>(authActions.ActionsEnum.RegisterSuccess),
    tap(() => this.router.navigate(['/login'])),
  );

  @Effect()
  verifyEmailRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.VerifyEmailRequest>(authActions.ActionsEnum.VerifyEmailRequest),
    map((action: authActions.VerifyEmailRequest) => action.payload.token),
    exhaustMap((token: string) =>
      this.authService.verifyEmail(token).pipe(
        map(() => (new authActions.VerifyEmailSuccess({ info: 'Email successfully verified.' }))),
        catchError((response: HttpErrorResponse) => of(new authActions.VerifyEmailFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect()
  forgotPasswordRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.ForgotPasswordSendMailRequest>(authActions.ActionsEnum.ForgotPasswordSendMailRequest),
    map((action: authActions.ForgotPasswordSendMailRequest) => action.payload.forgotPasswordModel),
    exhaustMap((forgotPasswordModel: ForgotPasswordModel) =>
      this.authService.requestPasswordReset(forgotPasswordModel).pipe(
        map(() => (new authActions.ForgotPasswordSendMailSuccess({ info: 'Reset password email successfully sent.' }))),
        catchError((response: HttpErrorResponse) => of(new authActions.ForgotPasswordSendMailFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect()
  resetPasswordRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.ResetPasswordRequest>(authActions.ActionsEnum.ResetPasswordRequest),
    map((action: authActions.ResetPasswordRequest) => action.payload.resetPasswordModel),
    exhaustMap((resetPasswordModel: ResetPasswordModel) =>
      this.authService.resetPassword(resetPasswordModel).pipe(
        map(() => (new authActions.ResetPasswordSuccess({ info: 'Password reset successful.' }))),
        catchError((response: HttpErrorResponse) => of(new authActions.ResetPasswordFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect({ dispatch: false})
  resetPasswordSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.ResetPasswordSuccess>(authActions.ActionsEnum.ResetPasswordSuccess),
    tap(() => this.router.navigate(['/login'])),
  );

  @Effect({ dispatch: false})
  logoutEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Logout>(authActions.ActionsEnum.Logout),
    tap(() => {
      AuthService.clearLocalStorage();
      this.router.navigate(['/']);
    })
  );

  @Effect()
  updateUserRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.UpdateUserRequest>(authActions.ActionsEnum.UpdateUserRequest),
    map((action: authActions.UpdateUserRequest) => action.payload.updateUser),
    exhaustMap((updateUser: UpdateUser) =>
      this.userService.updateUser(updateUser).pipe(
        map((user) => (new authActions.UpdateUserSuccess({ user })),
        catchError((response: HttpErrorResponse) => of(new authActions.UpdateUserFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) }))),
        )
      )
    )
  );

  @Effect({ dispatch: false })
  updateUserSuccessEffect$ = this.actions$.pipe(
    ofType<authActions.UpdateUserSuccess>(authActions.ActionsEnum.UpdateUserSuccess),
    map((action: authActions.UpdateUserSuccess) => action.payload.user),
    tap(user => AuthService.updateUserInLocalStorage(user)),
  );

  @Effect()
  followUserRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.FollowUserRequest>(authActions.ActionsEnum.FollowUserRequest),
    map((action: authActions.FollowUserRequest) => action.payload.followUser),
    exhaustMap((followUser: FollowUser) =>
      this.userService.followUser(followUser).pipe(
        map((user) => (new authActions.FollowUserSuccess({ user })),
          catchError((response: HttpErrorResponse) => of(new authActions.FollowUserFail({
            error: ValidationHelper.extractValidationMessageFromError(response.error.message) }))),
        )
      )
    )
  );

  @Effect({ dispatch: false })
  followUserSuccessEffect$ = this.actions$.pipe(
    ofType<authActions.FollowUserSuccess>(authActions.ActionsEnum.FollowUserSuccess),
    map((action: authActions.FollowUserSuccess) => action.payload.user),
    tap(user => {
      const u = AuthService.getUserFromLocalStorage();
      if (u.following.find(usr => usr.id === user.id)) {
        u.following = u.following.filter(usr => usr.id !== user.id);
      } else {
        u.following.push(user);
      }
      AuthService.updateUserInLocalStorage(u);
    }),
  );

  constructor(private readonly authService: AuthService, private readonly actions$: Actions, private readonly router: Router,
              private userService: UserService) { }
}
