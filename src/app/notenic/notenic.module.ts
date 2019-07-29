import { NgModule } from '@angular/core';
import { NotenicComponent } from './notenic.component';
import { SharedModule } from '@app/shared/shared.module';
import { NotenicRoutingModule } from '@notenic/notenic-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { AuthModule } from '@notenic/auth/auth.module';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  imports: [
    SharedModule,
    NotenicRoutingModule,
    AuthModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    NotenicComponent,
    HomeComponent,
    CreateNoteComponent,
  ]
})
export class NotenicModule { }
