import { Pipe, PipeTransform } from '@angular/core';
import { NoteService } from '@notenic/services/note.service';

@Pipe({
  name: 'noteImage'
})
export class NoteImagePipe implements PipeTransform {

  transform(noteImageUrl: string): any {
    const baseUrl = NoteService.getImageUrl();
    return `${baseUrl}${noteImageUrl}`;
  }
}
