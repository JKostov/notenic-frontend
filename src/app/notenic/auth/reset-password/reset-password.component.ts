import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../store/auth.state';
import { takeUntil } from 'rxjs/operators';
import { ResetPasswordFail, ResetPasswordRequest } from '../store/auth.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getError, getIsLoading } from '../store/auth.selectors';
import { ResetPasswordModel } from '../models/index';

@Component({
  selector: 'note-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private static Token = 'token';
  token: string = null;
  resetPasswordForm: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  error: string = null;
  isLoading = false;
  destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private fb: FormBuilder, private readonly store: Store<IAuthState>,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params[ResetPasswordComponent.Token]) {
        this.token = params[ResetPasswordComponent.Token];
      } else {
        this.store.dispatch(new ResetPasswordFail({ error: 'Invalid token' }));
        this.router.navigate(['/login']);
      }
    });

    this.emailFormControl = this.fb.control('', [Validators.required, Validators.email]);
    this.passwordFormControl = this.fb.control('', [Validators.required]);

    this.resetPasswordForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });

    this.store.pipe(select(getError), takeUntil(this.destroy$)).subscribe(val => this.error = val);
    this.store.pipe(select(getIsLoading), takeUntil(this.destroy$)).subscribe(val => this.isLoading = val);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onResetPasswordClick(): void {
    const resetPasswordModel = new ResetPasswordModel();

    resetPasswordModel.token = this.token;
    resetPasswordModel.email = this.emailFormControl.value;
    resetPasswordModel.password = this.passwordFormControl.value;

    this.store.dispatch(new ResetPasswordRequest({ resetPasswordModel }));
  }
}
