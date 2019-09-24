import { IAuthState } from './auth.state';
import { ActionsEnum, AuthActions } from './auth.actions';

export const initialAuthState: IAuthState = {
  error: null,
  info: null,
  isLoading: false,
  user: null,
  token: null,
};

export function authReducer(state: IAuthState = initialAuthState, action: AuthActions): IAuthState {
  switch (action.type) {
    case ActionsEnum.ResetPasswordRequest:
    case ActionsEnum.VerifyEmailRequest:
    case ActionsEnum.ForgotPasswordSendMailRequest:
    case ActionsEnum.UpdateUserRequest:
    case ActionsEnum.InitLogin: {
      return {
        ...state,
        error: null,
        info: null,
        isLoading: true,
      };
    }
    case ActionsEnum.ResetPasswordFail:
    case ActionsEnum.VerifyEmailFail:
    case ActionsEnum.RegisterFail:
    case ActionsEnum.ForgotPasswordSendMailFail:
    case ActionsEnum.UpdateUserFail:
    case ActionsEnum.LoginFail: {
      return {
        ...state,
        error: action.payload.error,
        info: null,
        isLoading: false,
      };
    }
    case ActionsEnum.LoginSuccess: {
      return {
        ...state,
        error: null,
        info: null,
        isLoading: false,
        user: action.payload.loginSuccessModel.user,
        token : action.payload.loginSuccessModel.token,
      };
    }
    case ActionsEnum.InitRegister: {
      return {
        ...state,
        error: null,
        info: null,
        isLoading: true,
      };
    }
    case ActionsEnum.ResetPasswordSuccess:
    case ActionsEnum.VerifyEmailSuccess:
    case ActionsEnum.ForgotPasswordSendMailSuccess:
    case ActionsEnum.RegisterSuccess: {
      return {
        ...initialAuthState,
        info: action.payload.info,
      };
    }
    case ActionsEnum.Logout: {
      return {
        ...initialAuthState,
      };
    }
    case ActionsEnum.UpdateUserSuccess: {
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
