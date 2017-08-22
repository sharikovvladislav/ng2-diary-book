import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromDiary from './diary';
import * as fromRoot from '../../reducers';

export interface DiaryState {
  diary: fromDiary.State;
}

export interface State extends fromRoot.State {
  'diary': DiaryState;
}

export const reducers = {
  diary: fromDiary.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getModuleState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getModuleState = createFeatureSelector<DiaryState>('diary');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getDiaryState = createSelector(
  getModuleState,
  (state: DiaryState) => state.diary,
);
export const getDiaryEntries = createSelector(
  getDiaryState,
  fromDiary.getEntries,
);
