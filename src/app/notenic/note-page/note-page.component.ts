import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { INoteRouteParams } from '@notenic/note-page/note-route-params.interface';
import { Note, User, Comment } from '@notenic/models';
import { NoteService } from '@notenic/services/note.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from '@notenic/auth/store/auth.state';
import { getUser } from '@notenic/auth/store/auth.selectors';

const sortCommentsByDate = (a: Comment, b: Comment) => (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime();

@Component({
  selector: 'note-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NotePageComponent implements OnInit, OnDestroy {
  note: Note;
  markDownFormControl: FormControl;
  preview = false;
  destroy$ = new Subject<void>();
  tagColors: string[] = [];
  user: User;
  liked = 0;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private fb: FormBuilder,
              private store: Store<IAuthState>, private router: Router) { }

  ngOnInit() {
    this.markDownFormControl = this.fb.control('');
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: INoteRouteParams) => {
      this.noteService.getNoteByUserAndTitle(params.user, params.note).pipe(first()).subscribe((note: Note) => {
        note.comments.sort(sortCommentsByDate);
        this.note = note;
        this.note.tags.forEach(() => this.tagColors.push(this.getTagStyle()));
        this.updateLiked();
      });
    });
    this.store.select(getUser).pipe(takeUntil(this.destroy$)).subscribe(val => (this.user = val, this.updateLiked()));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  togglePreview(): void {
    const md = this.markDownFormControl.value;
    if (md) {
      this.preview = !this.preview;
    }
  }

  onLikeClick(): void {
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.liked === 0) {
      this.liked = 1;
      this.noteService.likeNote(this.note.id, true).pipe(first()).subscribe(res => console.log(res));
    } else {
      this.liked = 0;
      this.noteService.likeNote(this.note.id, false).pipe(first()).subscribe(res => console.log(res));
    }
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }

  addComment(): void {
    const comment = this.markDownFormControl.value;
    if (!comment) {
      return;
    }

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.noteService.addComment({
      noteId: this.note.id,
      markdown: comment,
    }).pipe(first()).subscribe(c => this.addCommentToTheNote(c));
  }

  private addCommentToTheNote(comment: Comment): void {
    this.note.comments.push(comment);
    this.note.comments.sort(sortCommentsByDate);
  }

   private getTagStyle(): any {
    const bgColor = `#${Math.random().toString(16).slice(2, 8)}`;
    const nThreshold = 105;
    const components = this.getRGBComponents(bgColor);
    const bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    const textColor = ((255 - bgDelta) < nThreshold) ? '#000000' : '#ffffff';

    return { backgroundColor: bgColor, color: textColor };
  }

   private getRGBComponents(color): { R: number, G: number, B: number } {
    const r = color.substring(1, 3);
    const g = color.substring(3, 5);
    const b = color.substring(5, 7);

    return {
      R: parseInt(r, 16),
      G: parseInt(g, 16),
      B: parseInt(b, 16)
    };
  }

  private updateLiked(): void {
    if (!this.user || !this.note) {
      return;
    }

    if (this.note.likes.indexOf(this.user.id) !== -1) {
      this.liked = 1;
    }
  }
}
