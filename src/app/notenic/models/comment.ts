import { User } from '@notenic/models/user';

export class Comment {
  id: string;
  user: User;
  markdown: string;
  createdAt: Date;
  updatedAt: Date;
}
