import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Form, FormBuilder, FormControl, Validators} from '@angular/forms';
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
  tagsFormControl: FormControl;
  publicFormControl: FormControl;
  imageFormControl: FormControl;
  contentImagesFormControl: FormControl;
  imgSrc: string = null;
  img: string = null;
  tags: string[] = [];

  constructor(private readonly fb: FormBuilder, private readonly noteService: NoteService, private readonly store: Store<INotenicState>) {
  }

  ngOnInit(): void {
    this.markDownFormControl = this.fb.control('## Subtitle', Validators.required);
    this.titleFormControl = this.fb.control('', Validators.required);
    this.tagsFormControl = this.fb.control('');
    this.publicFormControl = this.fb.control(true, Validators.required);
    this.imageFormControl = this.fb.control('', Validators.required);
    this.contentImagesFormControl = this.fb.control('');
  }

  selectImage(data: any): void {
    if (data.target.files && data.target.files[0]) {
      const file = data.target.files[0];

      const formData = new FormData();
      formData.append('images[]', file, file.name);

      const baseUrl = NoteService.getImageUrl();

      this.noteService.uploadImages(formData).pipe(first()).subscribe(
        (model: UploadImages) => {
          this.imgSrc = baseUrl + model.imageUrls[0];
          this.img = model.imageUrls[0];
        }
      );
    }
  }

  selectContentImages(data: any): void {
    if (data.target.files && data.target.files.length > 0) {
      const formData = new FormData();

      for (const file of data.target.files) {
        formData.append('images[]', file, file.name);
      }

      const baseUrl = NoteService.getImageUrl();

      this.noteService.uploadImages(formData).pipe(first()).subscribe(
        (model: UploadImages) => {

          model.imageUrls.forEach(imgUrl => {
            let imgSrc = baseUrl + imgUrl;

            imgSrc = imgSrc.replace(/ /g, '%20');

            let md = this.markDownFormControl.value;
            md += `\n\n![Alt](${imgSrc})`;

            this.markDownFormControl.setValue(md);
          });
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
      tags: this.tags,
    };

    this.store.dispatch(new SaveNoteRequest({ createNote }));
  }

  addTag(): void {
    const tag = this.tagsFormControl.value;
    if (!tag) {
      return;
    }
    this.tags.push(tag);
    this.tagsFormControl.setValue('');
  }

  removeTag(tag: string): void {
    this.tags.splice(this.tags.indexOf(tag), 1);
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
