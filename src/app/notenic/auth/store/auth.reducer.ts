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
    case ActionsEnum.FollowUserRequest:
    case ActionsEnum.BookmarkNoteRequest:
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
    case ActionsEnum.FollowUserFail:
    case ActionsEnum.BookmarkNoteFail:
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
    case ActionsEnum.FollowUserSuccess: {
      return {
        ...state,
        isLoading: false,
        user: state.user.following.find(u => u.id === action.payload.user.id)
        ? {
            ...state.user,
            following: state.user.following.filter(u => u.id !== action.payload.user.id),
        }
        : {
            ...state.user,
            following: [
              ...state.user.following,
              action.payload.user,
            ],
        }
      };
    }
    case ActionsEnum.BookmarkNoteSuccess: {
      return {
        ...state,
        isLoading: false,
        user: state.user.bookmarkedNotes.find(n => n.id === action.payload.note.id)
        ? {
          ...state.user,
          bookmarkedNotes: state.user.bookmarkedNotes.filter(n => n.id !== action.payload.note.id),
        }
        : {
          ...state.user,
          bookmarkedNotes: [
            ...state.user.bookmarkedNotes,
            action.payload.note,
          ],
        }
      };
    }
    default: {
      return state;
    }
  }
}
