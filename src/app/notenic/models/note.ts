import { User } from '@notenic/models/user';

export class Note {
  title: string;
  markdown: string;
  image: string;
  user: User;
}
