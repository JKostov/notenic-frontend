import { Note } from '@notenic/models/note';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  work: string;
  education: string;
  about: string;
  notes: Note[];
  gender: 'male' | 'female';
}
