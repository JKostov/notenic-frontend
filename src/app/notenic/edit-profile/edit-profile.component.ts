import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { User } from '@notenic/models';
import { Subject } from 'rxjs';
import { getUser } from '@notenic/auth/store/auth.selectors';
import { takeUntil } from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'note-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  user: User;
  firstNameFormControl: FormControl;
  lastNamFormControl: FormControl;
  oldPasswordFormControl: FormControl;
  newPasswordFormControl: FormControl;
  workFormControl: FormControl;
  educationFormControl: FormControl;
  aboutFormControl: FormControl;
  editForm: FormGroup;
  gender: 'male' | 'female';
  destroy$ = new Subject<void>();

  constructor(private store: Store<IAuthState>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.firstNameFormControl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.lastNamFormControl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.oldPasswordFormControl = this.fb.control('');
    this.newPasswordFormControl = this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]);
    this.workFormControl = this.fb.control('', [Validators.maxLength(250)]);
    this.educationFormControl = this.fb.control('', [Validators.maxLength(250)]);
    this.aboutFormControl = this.fb.control('', [Validators.maxLength(500)]);

    this.editForm = this.fb.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNamFormControl,
      work: this.workFormControl,
      education: this.educationFormControl,
      about: this.aboutFormControl,
    });

    this.store.select(getUser).pipe(takeUntil(this.destroy$)).subscribe(val => this.updateUser(val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  changeGender(gender: 'male' | 'female'): void {
    this.gender = gender;
  }

  onSubmitClick(): void {

  }

  private updateUser(user: User): void {
    this.user = user;
    this.gender = user.gender;

    this.editForm.patchValue(user, { emitEvent: false });
  }
}
