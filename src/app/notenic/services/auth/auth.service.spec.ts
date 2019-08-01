import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: {} },
      AuthService,
    ],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
