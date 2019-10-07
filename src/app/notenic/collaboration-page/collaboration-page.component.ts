import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CollaborationService } from '@notenic/services/collaboration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, distinctUntilChanged, first, takeUntil } from 'rxjs/operators';
import {
  CollaborationDocData, CollaborationDocType,
  DeleteImage,
  ICollaborationRoutePrams,
  UpdateCollaborators,
  UploadImages,
  User
} from '@notenic/models';
import { of, Subject } from 'rxjs';
import { Collaboration } from '@notenic/models/collaboration';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoteService } from '@notenic/services/note.service';
import { Store } from '@ngrx/store';
import { INotenicState } from '@notenic/store/notenic.state';
import { SuiModalService } from 'ng2-semantic-ui';
import { CollaboratorsModal } from '@notenic/create-note/collaborators-modal/collaborators-modal';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { getUser } from '@notenic/auth/store/auth.selectors';
import { CollaborationSocketService } from '@notenic/services/collaboration-socket.service';
import * as Automerge from 'automerge';

@Component({
  selector: 'note-collaboration-page',
  templateUrl: './collaboration-page.component.html',
  styleUrls: ['./collaboration-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CollaborationPageComponent implements OnInit, OnDestroy {
  user: User;
  collaboration: Collaboration;
  activeCollaborators: string[] = [];
  markDownFormControl: FormControl;
  titleFormControl: FormControl;
  tagsFormControl: FormControl;
  // publicFormControl: FormControl;
  imageFormControl: FormControl;
  contentImagesFormControl: FormControl;
  imgSrc: string = null;
  imgBaseUrl: string;
  img: string = null;
  tags: string[] = [];
  error: string;
  tagChange = new Subject<void>();
  imageChange = new Subject<void>();
  destroy$ = new Subject<void>();

  doc: CollaborationDocType;
  changedDoc: CollaborationDocType;
  sendChanges = new Subject<CollaborationDocData>();

  constructor(private route: ActivatedRoute, private collaborationService: CollaborationService, private readonly fb: FormBuilder,
              private readonly noteService: NoteService, private readonly store: Store<INotenicState | IAuthState>, private router: Router,
              private modalService: SuiModalService, private collaborationSocketService: CollaborationSocketService) { }

  ngOnInit(): void {
    this.imgBaseUrl = NoteService.getImageUrl();
    this.markDownFormControl = this.fb.control('', Validators.required);
    this.titleFormControl = this.fb.control('', Validators.required);
    this.tagsFormControl = this.fb.control('');
    // this.publicFormControl = this.fb.control(true, Validators.required);
    this.imageFormControl = this.fb.control('', Validators.required);
    this.contentImagesFormControl = this.fb.control('');

    this.markDownFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateMarkdown());
    this.titleFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateTitle());
    // this.publicFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.updatePublic());
    this.tagChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateTags());
    this.imageChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateImage());

    this.store.select(getUser).pipe(takeUntil(this.destroy$)).subscribe(val => this.updateUser(val));
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: ICollaborationRoutePrams) => {
      const id = params.id;
      this.collaborationService.getCollaboration(id).pipe(first()).subscribe(val => this.updateCollaboration(val));
    });

    this.collaborationSocketService.getMessageWhenUserJoin()
      .pipe(takeUntil(this.destroy$)).subscribe(val => this.addActiveCollaborator(val));
    this.collaborationSocketService.getMessageWhenUserLeave()
      .pipe(takeUntil(this.destroy$)).subscribe(val => this.removeActiveCollaborator(val));

    this.collaborationSocketService.getUpdate().pipe(takeUntil(this.destroy$)).subscribe(val => this.applyCollaborationChanges(val));
    this.collaborationSocketService.getMerge().pipe(takeUntil(this.destroy$)).subscribe(val => this.applyCollaborationMerge(val));

    this.sendChanges.pipe(
      // debounceTime(200),
      distinctUntilChanged()
    ).subscribe(() => this.sendCollaborationChanges());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();

    if (this.collaboration) {
      this.collaborationSocketService.leaveRoom(this.collaboration.id);
    }
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
          this.imageChange.next();
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
        this.imageChange.next();
      }
    });
  }

  publishCollaboration(): void {
    const collaboration = new Collaboration();
    collaboration.id = this.collaboration.id;
    // collaboration.public = this.publicFormControl.value;
    collaboration.tags = this.tags;
    collaboration.image = this.img;
    collaboration.markdown = this.markDownFormControl.value;
    collaboration.title = this.titleFormControl.value;

    this.collaborationService.publishCollaboration(collaboration).pipe(first(), catchError(res => of(console.log(res))))
      .subscribe(async (res) => {
        await this.router.navigate(['/']);
    });
  }

  onSaveClick(): void {
    const collaboration = new Collaboration();
    collaboration.id = this.collaboration.id;
    // collaboration.public = this.publicFormControl.value;
    collaboration.tags = this.tags;
    collaboration.image = this.img;
    collaboration.markdown = this.markDownFormControl.value;
    collaboration.title = this.titleFormControl.value;

    this.collaborationService.saveCollaborationState(collaboration).pipe(first()).subscribe();
  }

  addTag(): void {
    const tag = this.tagsFormControl.value;
    if (!tag) {
      return;
    }
    this.tags.push(tag);
    this.tagChange.next();
    this.tagsFormControl.setValue('');
  }

  removeTag(tag: string): void {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.tagChange.next();
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

  isCollaboratorActive(user: User): boolean {
    const col = this.activeCollaborators.find(cid => cid === user.id);
    if (col) {
      return true;
    }

    return false;
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
    this.collaborationSocketService.joinRoom(this.collaboration.id).pipe(first()).subscribe(val => this.updateCollaborators(val));

    const options = { emitEvent: false };
    this.markDownFormControl.setValue(this.collaboration.markdown, options);
    this.titleFormControl.setValue(this.collaboration.title, options);
    // if (this.publicFormControl.value !== this.collaboration.public) {
    //   this.publicFormControl.setValue(this.collaboration.public, options);
    // }
    if (this.collaboration.image) {
      this.imgSrc = `${this.imgBaseUrl}${this.collaboration.image}`;
      this.img = this.collaboration.image;
    }
    this.tags = this.collaboration.tags;

    this.doc = Automerge.from<CollaborationDocData>({
      markdown: this.collaboration.markdown,
      title: this.collaboration.title,
      public: this.collaboration.public,
      image: this.collaboration.image,
      tags: this.collaboration.tags,
    });
    this.changedDoc = Automerge.init<CollaborationDocData>();
    this.changedDoc = Automerge.merge(this.changedDoc, this.doc);
  }

  private updateMarkdown(): void {
    this.changedDoc = Automerge.change(this.changedDoc, (doc: CollaborationDocData) => {
      doc.markdown = this.markDownFormControl.value;
    });
    this.sendChanges.next(this.changedDoc);
  }

  private updateTitle(): void {
    this.changedDoc = Automerge.change(this.changedDoc, (doc: CollaborationDocData) => {
      doc.title = this.titleFormControl.value;
    });
    this.sendChanges.next(this.changedDoc);
  }

  // private updatePublic(): void {
  //   this.changedDoc = Automerge.change(this.changedDoc, (doc: CollaborationDocData) => {
  //     doc.public = this.publicFormControl.value;
  //   });
  //   this.sendChanges.next(this.changedDoc);
  // }

  private updateTags(): void {
    this.changedDoc = Automerge.change(this.changedDoc, (doc: CollaborationDocData) => {
      doc.tags = this.tags;
    });
    this.sendChanges.next(this.changedDoc);
  }

  private updateImage(): void {
    this.changedDoc = Automerge.change(this.changedDoc, (doc: CollaborationDocData) => {
      doc.image = this.img;
    });
    this.sendChanges.next(this.changedDoc);
  }

  private updateUser(user: User): void {
    this.user = user;
    this.activeCollaborators.push(user.id);
  }

  private addActiveCollaborator(collaboratorId): void {
    this.activeCollaborators.push(collaboratorId);

    const changes = Automerge.getChanges(Automerge.init(), this.doc);
    this.collaborationSocketService.sendMerge({ id: this.collaboration.id, update: JSON.stringify(changes) });
  }

  private removeActiveCollaborator(collaboratorId): void {
    this.activeCollaborators = this.activeCollaborators.filter(cid => cid !== collaboratorId);
  }

  private updateCollaborators(collaborators: string[]): void {
    this.activeCollaborators = collaborators;
  }

  private sendCollaborationChanges(): void {
    const changes = Automerge.getChanges(this.doc, this.changedDoc);
    this.collaborationSocketService.sendUpdate({ id: this.collaboration.id, update: JSON.stringify(changes) });
    this.doc = Automerge.merge(this.doc, this.changedDoc);
  }

  private applyCollaborationChanges(changesData: string): void {
    const changes = JSON.parse(changesData);

    this.doc = Automerge.applyChanges(this.doc, changes);
    this.changedDoc = Automerge.applyChanges(this.changedDoc, changes);

    const options = { emitEvent: false };
    this.markDownFormControl.setValue(this.changedDoc.markdown, options);
    this.titleFormControl.setValue(this.changedDoc.title, options);
    // if (this.publicFormControl.value !== this.changedDoc.public) {
    //   this.publicFormControl.setValue(this.changedDoc.public, options);
    // }
    this.tags = [];
    for (let tagsKey in this.changedDoc.tags) {
      const tag = this.changedDoc.tags[tagsKey];
      this.tags.push(tag);
    }
    if (this.changedDoc.image) {
      this.img = this.changedDoc.image;
      this.imgSrc = `${this.imgBaseUrl}${this.changedDoc.image}`;
    } else {
      this.imgSrc = null;
      this.img = null;
    }
  }

  private applyCollaborationMerge(changesData: any): void {
    const changes = JSON.parse(changesData);

    this.doc = Automerge.applyChanges(Automerge.init(), changes);
    this.changedDoc = Automerge.merge(Automerge.init(), this.doc);

    const options = { emitEvent: false };
    this.markDownFormControl.setValue(this.changedDoc.markdown, options);
    this.titleFormControl.setValue(this.changedDoc.title, options);
    // if (this.publicFormControl.value !== this.changedDoc.public) {
    //   this.publicFormControl.setValue(this.changedDoc.public, options);
    // }
    this.tags = [];
    for (let tagsKey in this.changedDoc.tags) {
      const tag = this.changedDoc.tags[tagsKey];
      this.tags.push(tag);
    }
    if (this.changedDoc.image) {
      this.img = this.changedDoc.image;
      this.imgSrc = `${this.imgBaseUrl}${this.changedDoc.image}`;
    } else {
      this.imgSrc = null;
      this.img = null;
    }
  }
}
