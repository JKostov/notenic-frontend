import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { INotenicState } from '@notenic/store/notenic.state';
import { Note } from '@notenic/models';
import { Subject } from 'rxjs';
import { getNotes } from '@notenic/store/notenic.selectors';
import { takeUntil } from 'rxjs/operators';
import { NoteService } from '@notenic/services/note.service';

@Component({
  selector: 'note-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  notes: Note[];
  imgUrl: string;
  destroy$ = new Subject<void>();

  constructor(private readonly store: Store<INotenicState>) {
  }

  ngOnInit(): void {
    this.imgUrl = NoteService.getImageUrl();
    this.store.pipe(select(getNotes), takeUntil(this.destroy$)).subscribe(val => this.notes = val);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
