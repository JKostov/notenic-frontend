import { Gender } from '@notenic/models/types';
import { Params } from '@angular/router';
import { Doc } from 'automerge';

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

export interface BookmarkNote {
  noteId: string;
}

export interface CreateCollaboration {
  title: string;
  markdown: string;
  image: string;
  public: boolean;
  tags: string[];
  collaborators: string[];
}

export interface UpdateCollaborators {
  collaborationId: string;
  collaborators: string[];
}

export interface ICollaborationRoutePrams extends Params {
  id: string;
}

export interface CollaborationUpdate {
  id: string;
  update: any;
}

export interface CollaborationDocData {
  markdown: string;
  title: string;
}
