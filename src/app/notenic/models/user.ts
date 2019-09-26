import { Note } from '@notenic/models/note';
import { Gender } from '@notenic/models/types';

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
  gender: Gender;
  image: string;
  following: User[];
  followers: User[];
  bookmarkedNotes: Note[];
}
