import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotenicComponent } from '@notenic/notenic.component';

const routes: Routes = [
  {
    path: '',
    component: NotenicComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
