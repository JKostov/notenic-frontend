import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { HttpClient } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { initialAuthState } from '@notenic/auth/store/auth.reducer';
import { initialState } from '@notenic/store/notenic.reducer';

describe('NoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: {} },
      provideMockStore({
        initialState: { auth: initialAuthState, notes: initialState },
      }),
      NoteService,
    ]
  }));

  it('should be created', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service).toBeTruthy();
  });
});
