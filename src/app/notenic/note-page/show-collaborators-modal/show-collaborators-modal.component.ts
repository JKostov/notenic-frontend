import { Component, OnInit } from '@angular/core';
import { User } from '@notenic/models';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { SuiModal } from 'ng2-semantic-ui';
import { NoteService } from '@notenic/services/note.service';

export interface IShowCollaboratorsModalContext {
  title: string;
  id: string;
}

@Component({
  selector: 'note-show-collaborators-modal',
  templateUrl: './show-collaborators-modal.component.html',
  styleUrls: ['./show-collaborators-modal.component.scss']
})
export class ShowCollaboratorsModalComponent implements OnInit {
  loading = true;
  collaborators: User[] = [];

  constructor(public modal: SuiModal<IShowCollaboratorsModalContext, User[], void>, private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getCollaborators(this.modal.context.id).pipe(first(),
      catchError(() => of(this.modal.deny(undefined)))).subscribe((val: User[]) => this.updateCollaborators(val));
  }

  private updateCollaborators(users: User[]): void {
    this.collaborators = users;
    this.loading = false;
  }
}
