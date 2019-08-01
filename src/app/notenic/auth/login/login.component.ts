import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthState } from '../store/auth.state';
import { select, Store } from '@ngrx/store';
import { InitLogin } from '../store/auth.actions';
import { LoginModel } from '../models/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getError, getInfo, getIsLoading } from '../store/auth.selectors';

@Component({
  selector: 'note-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  destroy$ = new Subject<void>();
  error: string = null;
  info: string = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private store: Store<IAuthState>) { }

  ngOnInit(): void {
    this.emailFormControl = this.fb.control('', [Validators.required, Validators.email]);
    this.passwordFormControl = this.fb.control('', [Validators.required]);

    this.loginForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });

    this.store.pipe(select(getError), takeUntil(this.destroy$)).subscribe(val => this.error = val);
    this.store.pipe(select(getInfo), takeUntil(this.destroy$)).subscribe(val => this.info = val);
    this.store.pipe(select(getIsLoading), takeUntil(this.destroy$)).subscribe(val => this.isLoading = val);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLoginClick(): void {
    const loginModel = new LoginModel();

    loginModel.email = this.emailFormControl.value;
    loginModel.password = this.passwordFormControl.value;

    this.store.dispatch(new InitLogin({ loginModel }));
  }
}
