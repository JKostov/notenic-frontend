import { Action } from '@ngrx/store';
import {CreateCollaboration, CreateNote, Note} from '@notenic/models';
import {Collaboration} from '@notenic/models/collaboration';

export enum ActionsEnum {
  LoadNotesRequest = '[Notenic] Load notes request',
  LoadNotesSuccess = '[Notenic] Load notes success',
  LoadNotesFail = '[Notenic] Load notes fail',
  SaveNoteRequest = '[Notenic] Save note request',
  SaveNoteSuccess = '[Notenic] Save note success',
  SaveNoteFail = '[Notenic] Save note fail,',
  CreateCollaborationRequest = '[Notenic] Create collaboration request',
  CreateCollaborationSuccess = '[Notenic] Create collaboration success',
  CreateCollaborationFail = '[Notenic] Create collaboration fail',
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

export class CreateCollaborationRequest implements Action {
  readonly type = ActionsEnum.CreateCollaborationRequest;

  constructor(public payload: { createCollaboration: CreateCollaboration }) { }
}

export class CreateCollaborationSuccess implements Action {
  readonly type = ActionsEnum.CreateCollaborationSuccess;

  constructor(public payload: { collaboration: Collaboration }) { }
}

export class CreateCollaborationFail implements Action {
  readonly type = ActionsEnum.CreateCollaborationFail;

  constructor(public payload: { error: string }) { }
}

export type NotenicActions = LoadNotesRequest
  | LoadNotesSuccess
  | LoadNotesFail
  | SaveNoteRequest
  | SaveNoteSuccess
  | SaveNoteFail
  | CreateCollaborationRequest
  | CreateCollaborationSuccess
  | CreateCollaborationFail
;
