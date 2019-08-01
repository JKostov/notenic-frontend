import { Action } from '@ngrx/store';
import { LoginModel, LoginSuccessModel, RegisterModel, ResetPasswordModel, ForgotPasswordModel } from '../models/index';

export enum ActionsEnum {
  InitLogin = '[Auth] Init login',
  LoginSuccess = '[Auth] Login success',
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
}

export class InitLogin implements Action {
  readonly type = ActionsEnum.InitLogin;

  constructor(public payload: { loginModel: LoginModel }) { }
}

export class LoginSuccess implements Action {
  readonly type = ActionsEnum.LoginSuccess;

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

export type AuthActions = InitLogin
  | LoginSuccess
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
;