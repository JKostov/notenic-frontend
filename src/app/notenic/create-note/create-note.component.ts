import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'note-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CreateNoteComponent implements OnInit {
  markdown = `## Markdown`;

  constructor() { }

  ngOnInit() {
  }

}
