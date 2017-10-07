import { Action } from '@ngrx/store';

import { DiaryEntry } from 'ng2-diary-book-shared-models';

export const LOAD_LIST = '[Diary entries] Load list';
export const LOAD_LIST_SUCCESS = '[Diary entries] Load list success';
export const LOAD_LIST_FAILURE = '[Diary entries] Load list failure';

export const CREATE_ENTRY = '[Diary entries] Create entry';
export const CREATE_ENTRY_SUCCESS = '[Diary entries] Create entry success';
export const CREATE_ENTRY_FAILURE = '[Diary entries] Create entry failure';

export const EDIT_ENTRY = '[Diary entries] Edit entry';
export const EDIT_ENTRY_SUCCESS = '[Diary entries] Edit entry success';
export const EDIT_ENTRY_FAILURE = '[Diary entries] Edit entry failure';

export const GET_EDIT_ENTRY = '[Diary entries] Get edit entry';
export const GET_EDIT_ENTRY_SUCCESS = '[Diary entries] Get edit entry success';
export const GET_EDIT_ENTRY_FAILURE = '[Diary entries] Get edit entry failure';
export const GET_EDIT_ENTRY_CLEAR = '[Diary entries] Get edit entry clear';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadListAction implements Action {
  readonly type = LOAD_LIST;

  constructor(public payload?: string[]) {}
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

  constructor(public payload?: any) {}
}

export class GetEditEntryAction implements Action {
  readonly type = GET_EDIT_ENTRY;

  constructor(public payload: string) {}
}

export class GetEditEntrySuccessAction implements Action {
  readonly type = GET_EDIT_ENTRY_SUCCESS;

  constructor(public payload: DiaryEntry) {}
}

export class GetEditEntryFailureAction implements Action {
  readonly type = GET_EDIT_ENTRY_FAILURE;

  constructor(public payload?: any) {}
}

export class GetEditEntryClearAction implements Action {
  readonly type = GET_EDIT_ENTRY_CLEAR;

  constructor() {}
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
  | EditEntryAction
  | GetEditEntryAction
  | GetEditEntrySuccessAction
  | GetEditEntryClearAction
  | GetEditEntryFailureAction;
