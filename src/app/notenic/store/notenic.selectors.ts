import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createNotenicStoreName, INotenicState } from '@notenic/store/notenic.state';

const getNotenicFeature = createFeatureSelector<INotenicState>(createNotenicStoreName);

export const getError = createSelector(getNotenicFeature, state => state.error);
export const getInfo = createSelector(getNotenicFeature, state => state.info);
export const getIsLoading = createSelector(getNotenicFeature, state => state.isLoading);
export const getNotes = createSelector(getNotenicFeature, state => state.notes);
