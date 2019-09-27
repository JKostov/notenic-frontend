import { Action } from '@ngrx/store';
import { LoginModel, LoginSuccessModel, RegisterModel, ResetPasswordModel, ForgotPasswordModel } from '../models/index';
import { BookmarkNote, FollowUser, Note, UpdateUser, User } from '@notenic/models';

export enum ActionsEnum {
  InitLogin = '[Auth] Init login',
  LoginSuccess = '[Auth] Login success',
  LoginFromStorage = '[Auth] Login from storage',
  LoginFail = '[Auth] Login fail',
  InitRegister = '[Auth] Init register',
  RegisterSuccess = '[Auth] Register success',
  RegisterFail = '[Auth] Register fail',
  VerifyEmailRequest = '[Auth] Verify email request',
  VerifyEmailSuccess = '[Auth] Verify email success',
  VerifyEmailFail = '[Auth] Verify email fail',
  ForgotPasswordSendMailRequest = '[Auth] Forgot password send mail request',
  ForgotPasswordSendMailSuccess = '[Auth] Forgot password send mail success',
  ForgotPasswordSendMailFail = '[Auth] Forgot password send mail fail',
  ResetPasswordRequest = '[Auth] Reset password request',
  ResetPasswordSuccess = '[Auth] Reset password success',
  ResetPasswordFail = '[Auth] Reset password fail,',
  Logout = '[Auth] Logout',
  UpdateUserRequest = '[Auth] Update user request',
  UpdateUserSuccess = '[Auth] Update user success',
  UpdateUserFail = '[Auth] Update user fail',
  FollowUserRequest = '[Auth] Follow user request',
  FollowUserSuccess = '[Auth] Follow user success',
  FollowUserFail = '[Auth] Follow user fail',
  BookmarkNoteRequest = '[Auth] Bookmark note request',
  BookmarkNoteSuccess = '[Auth] Bookmark note success',
  BookmarkNoteFail = '[Auth] Bookmark note fail',
}

export class InitLogin implements Action {
  readonly type = ActionsEnum.InitLogin;

  constructor(public payload: { loginModel: LoginModel }) { }
}

export class LoginSuccess implements Action {
  readonly type = ActionsEnum.LoginSuccess;

  constructor(public payload: { loginSuccessModel: LoginSuccessModel }) { }
}

export class LoginFromStorage implements Action {
  readonly type = ActionsEnum.LoginFromStorage;

  constructor(public payload: { loginSuccessModel: LoginSuccessModel }) { }
}

export class LoginFail implements Action {
  readonly type = ActionsEnum.LoginFail;

  constructor(public payload: { error: string }) { }
}

export class InitRegister implements Action {
  readonly type = ActionsEnum.InitRegister;

  constructor(public payload: { registerModel: RegisterModel}) { }
}

export class RegisterSuccess implements Action {
  readonly  type = ActionsEnum.RegisterSuccess;

  constructor(public payload: { info: string }) { }
}

export class RegisterFail implements Action {
  readonly type = ActionsEnum.RegisterFail;

  constructor(public payload: { error: string }) { }
}

export class VerifyEmailRequest implements Action {
  readonly type = ActionsEnum.VerifyEmailRequest;

  constructor(public payload: { token: string }) { }
}

export class VerifyEmailSuccess implements Action {
  readonly type = ActionsEnum.VerifyEmailSuccess;

  constructor(public payload: { info: string }) { }
}

export class VerifyEmailFail implements Action {
  readonly type = ActionsEnum.VerifyEmailFail;

  constructor(public payload: { error: string }) { }
}

export class ForgotPasswordSendMailRequest implements Action {
  readonly type = ActionsEnum.ForgotPasswordSendMailRequest;

  constructor(public payload: { forgotPasswordModel: ForgotPasswordModel }) { }
}

export class ForgotPasswordSendMailSuccess implements Action {
  readonly type = ActionsEnum.ForgotPasswordSendMailSuccess;

  constructor(public payload: { info: string }) { }
}

export class ForgotPasswordSendMailFail implements Action {
  readonly type = ActionsEnum.ForgotPasswordSendMailFail;

  constructor(public payload: { error: string }) { }
}

export class ResetPasswordRequest implements Action {
  readonly type = ActionsEnum.ResetPasswordRequest;

  constructor(public payload: { resetPasswordModel: ResetPasswordModel }) { }
}

export class ResetPasswordSuccess implements Action {
  readonly type = ActionsEnum.ResetPasswordSuccess;

  constructor(public payload: { info: string }) { }
}

export class ResetPasswordFail implements Action {
  readonly type = ActionsEnum.ResetPasswordFail;

  constructor(public payload: { error: string }) { }
}

export class Logout implements Action {
  readonly type = ActionsEnum.Logout;
}

export class UpdateUserRequest implements Action {
  readonly type = ActionsEnum.UpdateUserRequest;

  constructor(public payload: { updateUser: UpdateUser }) { }
}

export class UpdateUserSuccess implements Action {
  readonly type = ActionsEnum.UpdateUserSuccess;

  constructor(public payload: { user: User }) { }
}

export class UpdateUserFail implements Action {
  readonly type = ActionsEnum.UpdateUserFail;

  constructor(public payload: { error: string }) { }
}

export class FollowUserRequest implements Action {
  readonly type = ActionsEnum.FollowUserRequest;

  constructor(public payload: { followUser: FollowUser }) { }
}

export class FollowUserSuccess implements Action {
  readonly type = ActionsEnum.FollowUserSuccess;

  constructor(public payload: { user: User }) { }
}

export class FollowUserFail implements Action {
  readonly type = ActionsEnum.FollowUserFail;

  constructor(public payload: { error: string }) { }
}

export class BookmarkNoteRequest implements Action {
  readonly type = ActionsEnum.BookmarkNoteRequest;

  constructor(public payload: { bookmarkNote: BookmarkNote }) {  }
}

export class BookmarkNoteSuccess implements Action {
  readonly type = ActionsEnum.BookmarkNoteSuccess;

  constructor(public payload: { note: Note }) {  }
}

export class BookmarkNoteFail implements Action {
  readonly type = ActionsEnum.BookmarkNoteFail;

  constructor(public payload: { error: string }) { }
}

export type AuthActions = InitLogin
  | LoginSuccess
  | LoginFromStorage
  | LoginFail
  | InitRegister
  | RegisterSuccess
  | RegisterFail
  | VerifyEmailRequest
  | VerifyEmailSuccess
  | VerifyEmailFail
  | ForgotPasswordSendMailRequest
  | ForgotPasswordSendMailSuccess
  | ForgotPasswordSendMailFail
  | ResetPasswordRequest
  | ResetPasswordSuccess
  | ResetPasswordFail
  | Logout
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFail
  | FollowUserRequest
  | FollowUserSuccess
  | FollowUserFail
  | BookmarkNoteRequest
  | BookmarkNoteSuccess
  | BookmarkNoteFail
;
