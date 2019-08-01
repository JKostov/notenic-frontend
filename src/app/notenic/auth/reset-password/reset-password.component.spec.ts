import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              error: null,
              info: null,
              isLoading: false,
              user: null,
              token: null,
            }
          }
        }),
        { provide: Router, useValue: { navigate: ([]) => {} } },
        { provide: ActivatedRoute, useValue: { params: new Observable()} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
