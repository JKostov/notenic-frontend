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
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { ProfileNotesComponent } from './profile/profile-notes/profile-notes.component';

@NgModule({
  imports: [
    SharedModule,
    NotenicRoutingModule,
    AuthModule,
    MarkdownModule.forChild(),
    StoreModule.forFeature(createNotenicStoreName, notenicReducer),
    EffectsModule.forFeature([NotenicEffects]),
    ImageCropperModule,
  ],
  declarations: [
    NotenicComponent,
    HomeComponent,
    CreateNoteComponent,
    NotePageComponent,
    ProfileComponent,
    EditProfileComponent,
    ProfileNotesComponent,
  ]
})
export class NotenicModule { }
