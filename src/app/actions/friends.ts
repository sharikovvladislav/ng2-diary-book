import { Action } from '@ngrx/store';

import { DiaryEntry } from '../models/diary-entry';
import { DiaryEntrySet } from '../models/diary-entry-set';

export const CREATE_FRIENDSHIP         = '[Friendship] Create friendship';
export const CREATE_FRIENDSHIP_SUCCESS = '[Friendship] Create friendship success';
export const CREATE_FRIENDSHIP_FAILURE = '[Friendship] Create friendship failure';

export const GET_FRIENDS         = '[Friendship] Get friends';
export const GET_FRIENDS_SUCCESS = '[Friendship] Get friends success';
export const GET_FRIENDS_FAILURE = '[Friendship] Get friends failure';

export const GET_PENDING_INVITES         = '[Friendship] Get pending invites';
export const GET_PENDING_INVITES_SUCCESS = '[Friendship] Get pending invites success';
export const GET_PENDING_INVITES_FAILURE = '[Friendship] Get pending invites failure';

export const GET_REJECTED_INVITES         = '[Friendship] Get rejected invites';
export const GET_REJECTED_INVITES_SUCCESS = '[Friendship] Get rejected invites success';
export const GET_REJECTED_INVITES_FAILURE = '[Friendship] Get rejected invites failure';

export const ACCEPT_INVITE         = '[Friendship] Accept invite';
export const ACCEPT_INVITE_SUCCESS = '[Friendship] Accept invite success';
export const ACCEPT_INVITE_FAILURE = '[Friendship] Accept invite failure';

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

export class GetFriendsAction implements Action {
  readonly type = GET_FRIENDS;
}

export class GetFriendsSuccessAction implements Action {
  readonly type = GET_FRIENDS_SUCCESS;

  constructor(public payload: any) { }
}

export class GetFriendsFailureAction implements Action {
  readonly type = GET_FRIENDS_FAILURE;

  constructor(public payload?: any) { }
}

export class AcceptInviteAction implements Action {
  readonly type = ACCEPT_INVITE;

  constructor(public payload: string) { }
}

export class AcceptInviteSuccessAction implements Action {
  readonly type = ACCEPT_INVITE_SUCCESS;
}

export class AcceptInviteFailureAction implements Action {
  readonly type = ACCEPT_INVITE_FAILURE;
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

export class GetRejectedInvitesAction implements Action {
  readonly type = GET_REJECTED_INVITES;
}

export class GetRejectedInvitesSuccessAction implements Action {
  readonly type = GET_REJECTED_INVITES_SUCCESS;

  constructor(public payload: any) { }
}

export class GetRejectedInvitesFailureAction implements Action {
  readonly type = GET_REJECTED_INVITES_FAILURE;

  constructor(public payload?: any) { }
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
  | GetRejectedInvitesAction
  | GetRejectedInvitesSuccessAction
  | GetRejectedInvitesFailureAction
  | AcceptInviteAction
  | AcceptInviteSuccessAction
  | AcceptInviteFailureAction
  | GetFriendsAction
  | GetFriendsSuccessAction
  | GetFriendsFailureAction
  | GetOutcomePendingInvitesAction
  | GetOutcomePendingInvitesSuccessAction
  | GetOutcomePendingInvitesFailureAction;
