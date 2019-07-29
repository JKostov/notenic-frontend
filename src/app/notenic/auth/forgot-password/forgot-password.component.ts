import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../store/auth.state';
import { takeUntil } from 'rxjs/operators';
import { getError, getInfo, getIsLoading } from '../store/auth.selectors';
import { ForgotPasswordModel } from '../models/forgot-password.model';
import { ForgotPasswordSendMailRequest } from '../store/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  token: string = null;
  emailFormControl: FormControl;
  forgotPasswordForm: FormGroup;
  error: string = null;
  info: string = null;
  isLoading = false;
  destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private readonly store: Store<IAuthState>) { }

  ngOnInit(): void {
    this.emailFormControl = this.fb.control('', [Validators.required, Validators.email]);

    this.forgotPasswordForm = this.fb.group({
      email: this.emailFormControl,
    });

    this.store.pipe(select(getError), takeUntil(this.destroy$)).subscribe(val => this.error = val);
    this.store.pipe(select(getInfo), takeUntil(this.destroy$)).subscribe(val => this.info = val);
    this.store.pipe(select(getIsLoading), takeUntil(this.destroy$)).subscribe(val => this.isLoading = val);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onForgotPasswordClick(): void {
    const forgotPasswordModel = new ForgotPasswordModel();

    forgotPasswordModel.email = this.emailFormControl.value;

    this.store.dispatch(new ForgotPasswordSendMailRequest({ forgotPasswordModel }));
  }
}
