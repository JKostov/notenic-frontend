import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { HttpClient } from '@angular/common/http';

describe('NoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: {} },
      NoteService,
    ]
  }));

  it('should be created', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service).toBeTruthy();
  });
});
