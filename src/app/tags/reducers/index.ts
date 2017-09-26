import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTags from './tags';
import * as fromRoot from '../../reducers';

export interface TagsState {
  tags: fromTags.State;
}

export interface State extends fromRoot.State {
  tags: TagsState;
}

export const reducers = {
  tags: fromTags.reducer,
};

export const getTagsModuleState = createFeatureSelector<TagsState>('tags');

export const getTagsState = createSelector(
  getTagsModuleState,
  (state: TagsState) => state.tags,
);
export const getTags = createSelector(getTagsState, fromTags.getTags);
