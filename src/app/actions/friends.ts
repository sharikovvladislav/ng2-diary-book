import { Action } from '@ngrx/store';

import { DiaryEntry } from '../models/diary-entry';
import { DiaryEntrySet } from '../models/diary-entry-set';

export const CREATE_FRIENDSHIP         = '[Friendship] Create friendship';
export const CREATE_FRIENDSHIP_SUCCESS = '[Friendship] Create friendship success';
export const CREATE_FRIENDSHIP_FAILURE = '[Friendship] Create friendship failure';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class CreateFriendshipAction implements Action {
  readonly type = CREATE_FRIENDSHIP;

  constructor(public payload: string) { }
}

export class CreateFriendshipSuccessAction implements Action {
  readonly type = CREATE_FRIENDSHIP_SUCCESS;
}

export class CreateFriendshipFailureAction implements Action {
  readonly type = CREATE_FRIENDSHIP_FAILURE;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = CreateFriendshipAction
  | CreateFriendshipSuccessAction
  | CreateFriendshipFailureAction;
