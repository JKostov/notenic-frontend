import { Doc } from 'automerge';
import { CollaborationDocData } from '@notenic/models/interfaces';

export type Gender = 'male' | 'female';

export type NotesTab = 'MyNotes' | 'Collaborations' | 'SavedNotes';

export type CollaborationDocType = Doc<CollaborationDocData>;
