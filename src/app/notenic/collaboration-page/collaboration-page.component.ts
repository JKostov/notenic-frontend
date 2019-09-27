import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CollaborationService } from '@notenic/services/collaboration.service';
import { ActivatedRoute } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import {CreateCollaboration, DeleteImage, ICollaborationRoutePrams, UpdateCollaborators, UploadImages, User} from '@notenic/models';
import { Subject } from 'rxjs';
import { Collaboration } from '@notenic/models/collaboration';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoteService } from '@notenic/services/note.service';
import { Store } from '@ngrx/store';
import { INotenicState } from '@notenic/store/notenic.state';
import { SuiModalService } from 'ng2-semantic-ui';
import { CreateCollaborationRequest } from '@notenic/store/notenic.actions';
import { CollaboratorsModal } from '@notenic/create-note/collaborators-modal/collaborators-modal';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { getUser } from '@notenic/auth/store/auth.selectors';

@Component({
  selector: 'note-collaboration-page',
  templateUrl: './collaboration-page.component.html',
  styleUrls: ['./collaboration-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CollaborationPageComponent implements OnInit, OnDestroy {
  user: User;
  collaboration: Collaboration;
  markDownFormControl: FormControl;
  titleFormControl: FormControl;
  tagsFormControl: FormControl;
  publicFormControl: FormControl;
  imageFormControl: FormControl;
  contentImagesFormControl: FormControl;
  imgSrc: string = null;
  imgBaseUrl: string;
  img: string = null;
  tags: string[] = [];
  error: string;
  destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private collaborationService: CollaborationService, private readonly fb: FormBuilder,
              private readonly noteService: NoteService, private readonly store: Store<INotenicState | IAuthState>,
              private modalService: SuiModalService) { }

  ngOnInit(): void {
    this.imgBaseUrl = NoteService.getImageUrl();
    this.markDownFormControl = this.fb.control('', Validators.required);
    this.titleFormControl = this.fb.control('', Validators.required);
    this.tagsFormControl = this.fb.control('');
    this.publicFormControl = this.fb.control(true, Validators.required);
    this.imageFormControl = this.fb.control('', Validators.required);
    this.contentImagesFormControl = this.fb.control('');

    this.store.select(getUser).pipe(takeUntil(this.destroy$)).subscribe(val => this.user = val);
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: ICollaborationRoutePrams) => {
      const id = params.id;
      this.collaborationService.getCollaboration(id).pipe(first()).subscribe(val => this.updateCollaboration(val));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  selectImage(data: any): void {
    if (data.target.files && data.target.files[0]) {
      const file = data.target.files[0];

      const formData = new FormData();
      formData.append('images[]', file, file.name);

      this.noteService.uploadImages(formData).pipe(first()).subscribe(
        (model: UploadImages) => {
          this.imgSrc = this.imgBaseUrl + model.imageUrls[0];
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

  publishCollaboration(): void {
    console.log('NOTE IMPLEMENTED');
    // const createNote: CreateNote = {
    //   title: this.titleFormControl.value,
    //   markdown: this.markDownFormControl.value,
    //   image: this.img,
    //   public: this.getBool(this.publicFormControl.value),
    //   tags: this.tags,
    // };
    //
    // this.store.dispatch(new SaveNoteRequest({ createNote }));
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

  onInviteCollaboratorsClicked(): void {
    if (!this.titleFormControl.value) {
      this.error = 'Title is required.';
      return;
    }
    this.error = null;
    const collabs = this.collaboration.collaborators.filter(c => c.id !== this.user.id ).map(c => ({ id: c.id }));
    this.modalService
      .open(new CollaboratorsModal('Choose collaborators', 5, collabs, 'mini'))
      .onApprove((collaborators: User[]) => this.onChosenCollaborators(collaborators))
      .onDeny(() => console.log('cancel'))
    ;
  }

  resetError(): void {
    this.error = null;
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

  private onChosenCollaborators(collaborators: User[]): void {
    if (!collaborators || collaborators.length === 0) {
      return;
    }

    const updateCollaborators: UpdateCollaborators = {
      collaborationId: this.collaboration.id,
      collaborators: collaborators.map(c => c.id),
    };

    this.collaborationService.updateCollaborators(updateCollaborators)
      .pipe(first()).subscribe(val => this.collaboration.collaborators = val);
  }

  private updateCollaboration(collaboration: Collaboration): void {
    this.collaboration = collaboration;
    const options = { emitEvent: false };
    this.markDownFormControl.patchValue(this.collaboration.markdown, options);
    this.titleFormControl.patchValue(this.collaboration.title, options);
    this.publicFormControl.patchValue(this.collaboration.public, options);
    if (this.collaboration.image) {
      this.imgSrc = `${this.imgBaseUrl}${this.collaboration.image}`;
      this.img = this.collaboration.image;
    }
    this.tags = this.collaboration.tags;
  }
}
