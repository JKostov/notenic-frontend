import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@notenic/models';
import { NoteService } from '@notenic/services/note.service';

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  transform(user: User): string {
    const baseUrl = NoteService.getImageUrl();
    if (!user.image) {
      return `assets/user-${user.gender}.png`;
    }

    return `${baseUrl}${user.image}`;
  }
}
