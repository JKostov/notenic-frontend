import { Component, OnInit } from '@angular/core';
import { SuiModal } from 'ng2-semantic-ui';
import { UserService } from '@notenic/services/user.service';
import { catchError, first } from 'rxjs/operators';
import { User } from '@notenic/models';
import { of } from 'rxjs';

export interface ICollaboratorsModalContext {
  title: string;
  max: number;
  collaborators: User[];
}

@Component({
  selector: 'note-collaborators-modal',
  templateUrl: './collaborators-modal.component.html',
  styleUrls: ['./collaborators-modal.component.scss']
})
export class CollaboratorsModalComponent implements OnInit {
  loading = true;
  users: User[] = [];
  collaborators: User[] = [];

  constructor(public modal: SuiModal<ICollaboratorsModalContext, User[], void>, private userService: UserService) {}

  ngOnInit(): void {
    this.collaborators = this.modal.context.collaborators;
    this.userService.getFollowing().pipe(first(),
      catchError(() => of(this.modal.deny(undefined)))).subscribe((val: User[]) => this.updateUsers(val));
  }

  addRemoveCollaborator(user: User): void {
    if (this.collaborators.find(c => c.id === user.id)) {
      this.collaborators = this.collaborators.filter(c => c.id !== user.id);
    } else if (this.modal.context.max > this.collaborators.length) {
      this.collaborators.push(user);
    }
  }

  isCollaborator(user: User): boolean {
    return !! this.collaborators.find(c => c.id === user.id);

  }

  private updateUsers(users: User[]): void {
    this.users = users;
    this.loading = false;
  }
}
