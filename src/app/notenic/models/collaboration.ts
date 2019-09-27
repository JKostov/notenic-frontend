import {User} from '@notenic/models/user';

export class Collaboration {
  id: string;
  title: string;
  markdown: string;
  image: string;
  user: User;
  public: boolean;
  collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}
