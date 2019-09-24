import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../store/auth.state';
import { getError, getIsLoading } from '../store/auth.selectors';
import { takeUntil } from 'rxjs/operators';
import { RegisterModel } from '../models/index';
import { InitRegister } from '../store/auth.actions';
import { Gender } from '@notenic/models';

@Component({
  selector: 'note-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  firstNameFormControl: FormControl;
  lastNamFormControl: FormControl;
  usernameFormControl: FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  destroy$ = new Subject<void>();
  error: string = null;
  isLoading = false;
  gender: Gender = 'male';

  constructor(private fb: FormBuilder, private store: Store<IAuthState>) {
  }

  ngOnInit(): void {
    this.firstNameFormControl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.lastNamFormControl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.usernameFormControl = this.fb.control('', [Validators.required, Validators.maxLength(30)]);
    this.emailFormControl = this.fb.control('', [Validators.required, Validators.maxLength(250), Validators.email]);
    this.passwordFormControl = this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]);

    this.registerForm = this.fb.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNamFormControl,
      username: this.usernameFormControl,
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

  onRegisterClick(): void {
    const registerModel = new RegisterModel();

    registerModel.firstName = this.firstNameFormControl.value;
    registerModel.lastName = this.lastNamFormControl.value;
    registerModel.username = this.usernameFormControl.value;
    registerModel.email = this.emailFormControl.value;
    registerModel.password = this.passwordFormControl.value;
    registerModel.gender = this.gender;

    this.store.dispatch(new InitRegister({ registerModel }));
  }

  changeGender(gender: Gender): void {
    this.gender = gender;
  }
}
