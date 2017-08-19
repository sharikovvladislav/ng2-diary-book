import { Action } from '@ngrx/store';

import { DiaryEntry } from '../../shared/models/diary-entry';

export const LOAD_LIST = '[Diary entries] Load list';
export const LOAD_LIST_SUCCESS = '[Diary entries] Load list success';
export const LOAD_LIST_FAILURE = '[Diary entries] Load list failure';

export const CREATE_ENTRY = '[Diary entries] Create entry';
export const CREATE_ENTRY_SUCCESS = '[Diary entries] Create entry success';
export const CREATE_ENTRY_FAILURE = '[Diary entries] Create entry failure';

export const EDIT_ENTRY = '[Diary entries] Edit entry';
export const EDIT_ENTRY_SUCCESS = '[Diary entries] Edit entry success';
export const EDIT_ENTRY_FAILURE = '[Diary entries] Edit entry failure';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadListAction implements Action {
  readonly type = LOAD_LIST;
}

export class LoadListSuccessAction implements Action {
  readonly type = LOAD_LIST_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadListFailureAction implements Action {
  readonly type = LOAD_LIST_FAILURE;

  constructor(public payload: any) {}
}

export class CreateEntryAction implements Action {
  readonly type = CREATE_ENTRY;

  constructor(public payload: DiaryEntry) {}
}

export class CreateEntrySuccessAction implements Action {
  readonly type = CREATE_ENTRY_SUCCESS;

  constructor(public payload: DiaryEntry) {}
}

export class CreateEntryFailureAction implements Action {
  readonly type = CREATE_ENTRY_FAILURE;

  constructor(public payload: any) {}
}

export class EditEntryAction implements Action {
  readonly type = EDIT_ENTRY;

  constructor(public payload: DiaryEntry) {}
}

export class EditEntrySuccessAction implements Action {
  readonly type = EDIT_ENTRY_SUCCESS;

  constructor(public payload: DiaryEntry) {}
}

export class EditEntryFailureAction implements Action {
  readonly type = EDIT_ENTRY_FAILURE;

  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | LoadListAction
  | LoadListSuccessAction
  | LoadListFailureAction
  | CreateEntryFailureAction
  | CreateEntrySuccessAction
  | CreateEntryFailureAction
  | EditEntryFailureAction
  | EditEntrySuccessAction
  | EditEntryAction;
