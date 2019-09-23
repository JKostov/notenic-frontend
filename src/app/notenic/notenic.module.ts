import { NgModule } from '@angular/core';
import { NotenicComponent } from './notenic.component';
import { SharedModule } from '@app/shared/shared.module';
import { NotenicRoutingModule } from '@notenic/notenic-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { AuthModule } from '@notenic/auth/auth.module';
import { MarkdownModule } from 'ngx-markdown';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { createNotenicStoreName } from '@notenic/store/notenic.state';
import { notenicReducer } from '@notenic/store/notenic.reducer';
import { NotenicEffects } from '@notenic/store/notenic.effects';
import { NotePageComponent } from './note-page/note-page.component';

@NgModule({
  imports: [
    SharedModule,
    NotenicRoutingModule,
    AuthModule,
    MarkdownModule.forChild(),
    StoreModule.forFeature(createNotenicStoreName, notenicReducer),
    EffectsModule.forFeature([NotenicEffects]),
  ],
  declarations: [
    NotenicComponent,
    HomeComponent,
    CreateNoteComponent,
    NotePageComponent,
  ]
})
export class NotenicModule { }
