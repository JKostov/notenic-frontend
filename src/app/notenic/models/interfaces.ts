import { Gender } from '@notenic/models/types';

export interface UploadImages {
  imageUrls: string[];
}

export interface DeleteImage {
  success: true;
}

export interface CreateNote {
  title: string;
  markdown: string;
  image: string;
  public: boolean;
  tags: string[];
}

export interface CreateNoteComment {
  noteId: string;
  markdown: string;
}

export interface UpdateUser {
  firstName: string;
  lastName: string;
  oldPassword: string;
  newPassword: string;
  gender: Gender;
  work: string;
  education: string;
  about: string;
  image: string;
}

export interface FollowUser {
  userId: string;
}
