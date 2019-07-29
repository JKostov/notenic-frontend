import { IAuthState } from './auth.state';
import { ActionsEnum, AuthActions } from './auth.actions';

export const initialRecipesState: IAuthState = {
  error: null,
  info: null,
  isLoading: false,
  user: null,
  token: null,
};

export function authReducer(state: IAuthState = initialRecipesState, action: AuthActions): IAuthState {
  switch (action.type) {
    case ActionsEnum.ResetPasswordRequest:
    case ActionsEnum.VerifyEmailRequest:
    case ActionsEnum.ForgotPasswordSendMailRequest:
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
        ...initialRecipesState,
        info: action.payload.info,
      };
    }
    case ActionsEnum.Logout: {
      return {
        ...initialRecipesState,
      };
    }
    default: {
      return state;
    }
  }
}
