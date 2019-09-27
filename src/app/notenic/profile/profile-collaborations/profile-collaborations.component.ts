import { Component, Input, OnInit } from '@angular/core';
import { Collaboration } from '@notenic/models/collaboration';

@Component({
  selector: 'note-profile-collaborations',
  templateUrl: './profile-collaborations.component.html',
  styleUrls: ['./profile-collaborations.component.scss']
})
export class ProfileCollaborationsComponent implements OnInit {
  @Input() collaborations: Collaboration[];

  constructor() { }

  ngOnInit(): void {
  }

}
