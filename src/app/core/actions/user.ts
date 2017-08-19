import { Action } from '@ngrx/store';

export const LOAD_USER_DATA = '[User] Login';
export const UNLOAD_USER_DATA = '[User] Logout';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadUserAction implements Action {
  readonly type = LOAD_USER_DATA;

  constructor(public payload: any) {}
}

export class UnloadUserAction implements Action {
  readonly type = UNLOAD_USER_DATA;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = UnloadUserAction | LoadUserAction;
