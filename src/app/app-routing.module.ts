import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotenicComponent } from '@notenic/notenic.component';

const routes: Routes = [
  {
    path: '',
    component: NotenicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./notenic/notenic.module').then(m => m.NotenicModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./notenic/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
