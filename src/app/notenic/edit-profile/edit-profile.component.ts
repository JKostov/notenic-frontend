import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { Gender, UpdateUser, UploadImages, User } from '@notenic/models';
import { Subject } from 'rxjs';
import { getUser } from '@notenic/auth/store/auth.selectors';
import { first, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { NoteService } from '@notenic/services/note.service';
import { UpdateUserRequest } from '@notenic/auth/store/auth.actions';

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
  gender: Gender;
  cropperSettings: CropperSettings;
  data: any;
  imagePicked = false;
  changeImage = false;
  destroy$ = new Subject<void>();
  @ViewChild('cropper', null)
  cropper: ImageCropperComponent;

  constructor(private store: Store<IAuthState>, private fb: FormBuilder, private noteService: NoteService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 225;
    this.cropperSettings.height = 225;
    this.cropperSettings.croppedWidth = 225;
    this.cropperSettings.croppedHeight = 225;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 200;
    this.cropperSettings.rounded = true;

    this.data = {};
  }

  ngOnInit(): void {
    this.firstNameFormControl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.lastNamFormControl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.oldPasswordFormControl = this.fb.control(null);
    this.newPasswordFormControl = this.fb.control(null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]);
    this.workFormControl = this.fb.control('', [Validators.maxLength(250)]);
    this.educationFormControl = this.fb.control('', [Validators.maxLength(250)]);
    this.aboutFormControl = this.fb.control('', [Validators.maxLength(500)]);

    this.editForm = this.fb.group({
      firstName: this.firstNameFormControl,
      lastName: this.lastNamFormControl,
      work: this.workFormControl,
      education: this.educationFormControl,
      about: this.aboutFormControl,
      newPassword: this.newPasswordFormControl,
      oldPassword: this.oldPasswordFormControl,
    });

    this.store.select(getUser).pipe(takeUntil(this.destroy$)).subscribe(val => this.updateUser(val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  changeGender(gender: Gender): void {
    this.gender = gender;
  }

  onSubmitClick(): void {
    const updateUser: UpdateUser = this.editForm.value;
    updateUser.image = this.user.image;
    updateUser.gender = this.gender;

    this.store.dispatch(new UpdateUserRequest({ updateUser }));
  }

  onImageSet(): void {
    this.imagePicked = true;
  }

  onChangeImageClicked(): void {
    this.changeImage = true;
  }

  onChangeImageDone(): void {
    this.changeImage = false;

    if (this.data.image) {
      const originalFile = this.cropper.fileInput.nativeElement.files[0];

      const byteCharacters = atob(this.data.image.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([ byteArray ], {
        type : originalFile.type
      });

      const formData = new FormData();
      formData.append('images[]', blob, originalFile.name);

      this.noteService.uploadImages(formData).pipe(first()).subscribe(
        (model: UploadImages) => {
          this.user.image = model.imageUrls[0];
          this.data = {};
          this.imagePicked = false;
        }
      );
    }
  }

  private updateUser(user: User): void {
    this.user = user;
    this.gender = user.gender;

    this.editForm.patchValue({ ...user }, { emitEvent: false });
  }
}
