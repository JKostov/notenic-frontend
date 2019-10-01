import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { ComponentsModule } from '@app/shared/components/components.module';
import { UserImagePipe } from './pipes/user-image.pipe';
import { NoteImagePipe } from './pipes/note-image.pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SuiModule,
    ComponentsModule,
    PerfectScrollbarModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SuiModule,
    ComponentsModule,
    UserImagePipe,
    NoteImagePipe,
    PerfectScrollbarModule,
  ],
  declarations: [UserImagePipe, NoteImagePipe],
})
export class SharedModule { }
