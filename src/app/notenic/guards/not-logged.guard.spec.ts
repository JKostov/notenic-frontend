import { TestBed, async, inject } from '@angular/core/testing';

import { NotLoggedGuard } from './not-logged.guard';
import { Router } from '@angular/router';

describe('NotLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotLoggedGuard,
        { provide: Router, useValue: { navigate: ([]) => {} } },
      ]
    });
  });

  it('should ...', inject([NotLoggedGuard], (guard: NotLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
