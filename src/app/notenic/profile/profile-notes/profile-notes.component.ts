import {Component, Input, OnInit} from '@angular/core';
import {Note, User} from '@notenic/models';

@Component({
  selector: 'note-profile-notes',
  templateUrl: './profile-notes.component.html',
  styleUrls: ['./profile-notes.component.scss']
})
export class ProfileNotesComponent implements OnInit {
  @Input() notes: Note[];
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
