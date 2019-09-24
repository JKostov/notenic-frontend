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
  LoadNotesFail
} from './notenic.actions';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidationHelper } from '@app/shared/helpers/validation.helper';
import { CreateNote } from '@notenic/models';
import { NoteService } from '@notenic/services/note.service';

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

  constructor(private readonly noteService: NoteService, private readonly actions$: Actions, private readonly router: Router) { }
}
