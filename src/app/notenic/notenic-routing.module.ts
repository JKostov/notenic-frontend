import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotenicComponent } from '@notenic/notenic.component';
import { HomeComponent } from '@notenic/home/home.component';
import { CreateNoteComponent } from '@notenic/create-note/create-note.component';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import {NotePageComponent} from '@notenic/note-page/note-page.component';


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
        path: 'note/create',
        component: CreateNoteComponent,
        canActivate: [LoggedGuard],
        canLoad: [LoggedGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotenicRoutingModule { }
