import { Action } from '@ngrx/store';

export const GET_TAGS_LIST = '[Tags] Start receive tags list';
export const GET_TAGS_LIST_SUCCESS = '[Tags] Success receive tags list';
export const GET_TAGS_LIST_FAILURE = '[Tags] Error receive tags list';

export class GetTagsListAction implements Action {
  readonly type = GET_TAGS_LIST;

  constructor() {}
}

export class GetTagsListSuccessAction implements Action {
  readonly type = GET_TAGS_LIST_SUCCESS;

  constructor(public payload: any) {}
}
export class GetTagsListFailureAction implements Action {
  readonly type = GET_TAGS_LIST_FAILURE;

  constructor(public payload?: any) {}
}
export type Actions =
  | GetTagsListAction
  | GetTagsListSuccessAction
  | GetTagsListFailureAction;
