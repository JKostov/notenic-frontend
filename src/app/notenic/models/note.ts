import { User } from '@notenic/models/user';
import { Comment } from '@notenic/models/comment';

export class Note {
  id: string;
  title: string;
  markdown: string;
  image: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  collaborators: string[];
  comments: Comment[];
  likes: string[];
}
