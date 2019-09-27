import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  ActionsEnum,
  SaveNoteRequest,
  SaveNoteSuccess,
  SaveNoteFail,
  LoadNotesRequest,
  LoadNotesSuccess,
  LoadNotesFail, CreateCollaborationRequest, CreateCollaborationSuccess, CreateCollaborationFail
} from './notenic.actions';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidationHelper } from '@app/shared/helpers/validation.helper';
import { CreateCollaboration, CreateNote } from '@notenic/models';
import { NoteService } from '@notenic/services/note.service';
import { Collaboration } from '@notenic/models/collaboration';
import { CollaborationService } from '@notenic/services/collaboration.service';

@Injectable({ providedIn: 'root' })
export class NotenicEffects {

  @Effect()
  loadNoteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoadNotesRequest>(ActionsEnum.LoadNotesRequest),
    exhaustMap(() =>
      this.noteService.getFeed().pipe(
        map((notes) => (new LoadNotesSuccess({ notes }))),
        catchError((response: HttpErrorResponse) => of(new LoadNotesFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect()
  saveNoteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<SaveNoteRequest>(ActionsEnum.SaveNoteRequest),
    map((action: SaveNoteRequest) => action.payload.createNote),
    exhaustMap((createNote: CreateNote) =>
      this.noteService.publishNote(createNote).pipe(
        map(() => (new SaveNoteSuccess({ info: 'Note successfully created.' }))),
        catchError((response: HttpErrorResponse) => of(new SaveNoteFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect({ dispatch: false})
  saveNoteSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<SaveNoteSuccess>(ActionsEnum.SaveNoteSuccess),
    tap(() => this.router.navigate(['/'])),
  );

  @Effect()
  createCollaborationRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<CreateCollaborationRequest>(ActionsEnum.CreateCollaborationRequest),
    map((action: CreateCollaborationRequest) => action.payload.createCollaboration),
    exhaustMap((createCollaboration: CreateCollaboration) =>
      this.collaborationService.createCollaboration(createCollaboration).pipe(
        map((collaboration: Collaboration) => (new CreateCollaborationSuccess({ collaboration }))),
        catchError((response: HttpErrorResponse) => of(new CreateCollaborationFail({
          error: ValidationHelper.extractValidationMessageFromError(response.error.message) })))
      )
    )
  );

  @Effect({ dispatch: false})
  createCollaborationSuccessEffect$ = this.actions$.pipe(ofType<CreateCollaborationSuccess>(ActionsEnum.CreateCollaborationSuccess),
    map((action: CreateCollaborationSuccess) => action.payload.collaboration),
    tap((collaboration: Collaboration) => this.router.navigate(['/collaboration', collaboration.id])),
  );

  constructor(private readonly noteService: NoteService, private collaborationService: CollaborationService,
              private readonly actions$: Actions, private readonly router: Router) { }
}
