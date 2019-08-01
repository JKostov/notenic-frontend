import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedGuard } from './logged.guard';
import { Router } from '@angular/router';

describe('LoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedGuard,
        { provide: Router, useValue: { navigate: ([]) => {} } },
      ]
    });
  });

  it('should ...', inject([LoggedGuard], (guard: LoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
