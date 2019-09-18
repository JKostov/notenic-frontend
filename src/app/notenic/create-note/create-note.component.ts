import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoteService } from '@notenic/services/note.service';
import { first } from 'rxjs/operators';
import { CreateNote, DeleteImage, UploadImages } from '@notenic/models';
import { Store } from '@ngrx/store';
import { INotenicState } from '@notenic/store/notenic.state';
import { SaveNoteRequest } from '@notenic/store/notenic.actions';

@Component({
  selector: 'note-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CreateNoteComponent implements OnInit {
  markDownFormControl: FormControl;
  titleFormControl: FormControl;
  publicFormControl: FormControl;
  imageFormControl: FormControl;
  imgSrc: string = null;
  img: string = null;

  constructor(private readonly fb: FormBuilder, private readonly noteService: NoteService, private readonly store: Store<INotenicState>) {
  }

  ngOnInit(): void {
    this.markDownFormControl = this.fb.control('## Subtitle', Validators.required);
    this.titleFormControl = this.fb.control('', Validators.required);
    this.publicFormControl = this.fb.control(true, Validators.required);
    this.imageFormControl = this.fb.control('', Validators.required);
  }

  selectImage(data: any): void {
    if (data.target.files && data.target.files[0]) {
      const file = data.target.files[0];

      const formData = new FormData();
      formData.append('images', file, file.name);

      const baseUrl = NoteService.getImageUrl();

      this.noteService.uploadImages(formData).pipe(first()).subscribe(
        (model: UploadImages) => {
          this.imgSrc = baseUrl + model.imageUrls[0];
          this.img = model.imageUrls[0];
        }
      );
    }
  }

  removeImage(): void {
    this.noteService.deleteImage(this.img).pipe(first()).subscribe((deleteImage: DeleteImage) => {
      if (deleteImage.success) {
        this.imageFormControl.setValue('');
        this.imgSrc = null;
        this.img = null;
      }
    });
  }

  publishNote(): void {
    const createNote: CreateNote = {
      title: this.titleFormControl.value,
      markdown: this.markDownFormControl.value,
      image: this.img,
      public: this.getBool(this.publicFormControl.value),
    };

    this.store.dispatch(new SaveNoteRequest({ createNote }));
  }

  getBool(value: any): boolean {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }
}
