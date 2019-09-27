import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotenicComponent } from '@notenic/notenic.component';
import { HomeComponent } from '@notenic/home/home.component';
import { CreateNoteComponent } from '@notenic/create-note/create-note.component';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import { NotePageComponent } from '@notenic/note-page/note-page.component';
import { ProfileComponent } from '@notenic/profile/profile.component';
import { EditProfileComponent } from '@notenic/edit-profile/edit-profile.component';
import { CollaborationPageComponent } from '@notenic/collaboration-page/collaboration-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotenicComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'note/:user/:note',
        component: NotePageComponent,
      },
      {
        path: 'collaboration/:id',
        component: CollaborationPageComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'note/create',
        component: CreateNoteComponent,
        canActivate: [LoggedGuard],
      },
      {
        path: 'profile/:username',
        component: ProfileComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [LoggedGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotenicRoutingModule { }
