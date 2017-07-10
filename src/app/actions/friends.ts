import { Action } from '@ngrx/store';

import { DiaryEntry } from '../models/diary-entry';
import { DiaryEntrySet } from '../models/diary-entry-set';

export const CREATE_FRIENDSHIP         = '[Friendship] Create friendship';
export const CREATE_FRIENDSHIP_SUCCESS = '[Friendship] Create friendship success';
export const CREATE_FRIENDSHIP_FAILURE = '[Friendship] Create friendship failure';

export const GET_PENDING_INVITES         = '[Friendship] Get pending invites';
export const GET_PENDING_INVITES_SUCCESS = '[Friendship] Get pending invites success';
export const GET_PENDING_INVITES_FAILURE = '[Friendship] Get pending invites failure';

export const GET_OUTCOME_PENDING_INVITES         = '[Friendship] Get outcome pending invites';
export const GET_OUTCOME_PENDING_INVITES_SUCCESS = '[Friendship] Get outcome pending invites success';
export const GET_OUTCOME_PENDING_INVITES_FAILURE = '[Friendship] Get outcome pending invites failure';


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

export class GetPendingInvitesAction implements Action {
  readonly type = GET_PENDING_INVITES;
}

export class GetPendingInvitesSuccessAction implements Action {
  readonly type = GET_PENDING_INVITES_SUCCESS;

  constructor(public payload: any) { }
}

export class GetPendingInvitesFailureAction implements Action {
  readonly type = GET_PENDING_INVITES_FAILURE;

  constructor(public payload: any) { }
}

export class GetOutcomePendingInvitesAction implements Action {
  readonly type = GET_OUTCOME_PENDING_INVITES;
}

export class GetOutcomePendingInvitesSuccessAction implements Action {
  readonly type = GET_OUTCOME_PENDING_INVITES_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOutcomePendingInvitesFailureAction implements Action {
  readonly type = GET_OUTCOME_PENDING_INVITES_FAILURE;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = CreateFriendshipAction
  | CreateFriendshipSuccessAction
  | CreateFriendshipFailureAction
  | GetPendingInvitesAction
  | GetPendingInvitesSuccessAction
  | GetPendingInvitesFailureAction
  | GetOutcomePendingInvitesAction
  | GetOutcomePendingInvitesSuccessAction
  | GetOutcomePendingInvitesFailureAction;
