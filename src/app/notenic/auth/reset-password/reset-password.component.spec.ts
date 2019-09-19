import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '@app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { initialAuthState } from '@notenic/auth/store/auth.reducer';
import { FormBuilder } from '@angular/forms';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { INotenicState } from '@notenic/store/notenic.state';
import { initialState } from '@notenic/store/notenic.reducer';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      providers: [
        provideMockStore<IAuthState>({
          initialState: { ...initialAuthState },
        }),
        provideMockStore<INotenicState>({
          initialState: { ...initialState },
        }),
        { provide: Router, useValue: { navigate: ([]) => {} } },
        { provide: ActivatedRoute, useValue: { params: new Observable()} },
        FormBuilder,
      ],
      declarations: [ ResetPasswordComponent ],
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
