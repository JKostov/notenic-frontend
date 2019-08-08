import { Action } from '@ngrx/store';
import {CreateNote, Note} from '@notenic/models';

export enum ActionsEnum {
  LoadNotesRequest = '[Notenic] Load notes request',
  LoadNotesSuccess = '[Notenic] Load notes success',
  LoadNotesFail = '[Notenic] Load notes fail',
  SaveNoteRequest = '[Notenic] Save note request',
  SaveNoteSuccess = '[Notenic] Save note success',
  SaveNoteFail = '[Notenic] Save note fail,',
}

export class LoadNotesRequest implements Action {
  readonly  type = ActionsEnum.LoadNotesRequest;
}

export class LoadNotesSuccess implements Action {
  readonly  type = ActionsEnum.LoadNotesSuccess;

  constructor(public payload: { notes: Note[] }) { }
}

export class LoadNotesFail implements Action {
  readonly type = ActionsEnum.LoadNotesFail;

  constructor(public payload: { error: string }) { }
}

export class SaveNoteRequest implements Action {
  readonly type = ActionsEnum.SaveNoteRequest;

  constructor(public payload: { createNote: CreateNote }) { }
}

export class SaveNoteSuccess implements Action {
  readonly type = ActionsEnum.SaveNoteSuccess;

  constructor(public payload: { info: string }) { }
}

export class SaveNoteFail implements Action {
  readonly type = ActionsEnum.SaveNoteFail;

  constructor(public payload: { error: string }) { }
}

export type NotenicActions = LoadNotesRequest
  | LoadNotesSuccess
  | LoadNotesFail
  | SaveNoteRequest
  | SaveNoteSuccess
  | SaveNoteFail
;
