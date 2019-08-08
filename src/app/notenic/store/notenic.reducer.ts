import {INotenicState} from './notenic.state';
import {ActionsEnum, NotenicActions} from './notenic.actions';

export const initialRecipesState: INotenicState = {
  error: null,
  info: null,
  isLoading: false,
  notes: [],
};

export function notenicReducer(state: INotenicState = initialRecipesState, action: NotenicActions): INotenicState {
  switch (action.type) {
    case ActionsEnum.LoadNotesRequest:
    case ActionsEnum.SaveNoteRequest: {
      return {
        ...state,
        error: null,
        info: null,
        isLoading: true,
      };
    }
    case ActionsEnum.LoadNotesFail:
    case ActionsEnum.SaveNoteFail: {
      return {
        ...state,
        error: action.payload.error,
        info: null,
        isLoading: false,
      };
    }
    case ActionsEnum.LoadNotesSuccess: {
      return {
        ...state,
        notes: action.payload.notes,
      };
    }
    case ActionsEnum.SaveNoteSuccess: {
      return {
        ...state,
        error: null,
        info: null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
