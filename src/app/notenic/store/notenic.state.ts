import { Note } from '@notenic/models';

export const createNotenicStoreName = 'notenic';

export interface INotenicState {
  error: string;
  info: string;
  isLoading: boolean;
  notes: Note[];
}
