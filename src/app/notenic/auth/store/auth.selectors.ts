import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createAuthStoreName, IAuthState } from './auth.state';

const getAuthFeature = createFeatureSelector<IAuthState>(createAuthStoreName);

export const getUser = createSelector(getAuthFeature, state => state.user);
export const getError = createSelector(getAuthFeature, state => state.error);
export const getInfo = createSelector(getAuthFeature, state => state.info);
export const getIsLoading = createSelector(getAuthFeature, state => state.isLoading);
