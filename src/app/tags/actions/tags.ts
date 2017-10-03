import { Action } from '@ngrx/store';

export const GET_TAGS_LIST = '[Tags] Receive tags list';
export const GET_TAGS_LIST_SUCCESS = '[Tags] Receive tags list success';
export const GET_TAGS_LIST_FAILURE = '[Tags] Receive tags list error';

export const CREATE_TAG = '[Tags] Create tag';
export const CREATE_TAG_SUCCESS = '[Tags] Create tag success';
export const CREATE_TAG_FAILURE = '[Tags] Create tag failure';

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

export class CreateTag implements Action {
  readonly type = CREATE_TAG;

  constructor(public payload: string) {}
}

export class CreateTagSuccess implements Action {
  readonly type = CREATE_TAG_SUCCESS;

  constructor(public payload?: any) {}
}

export class CreateTagFailure implements Action {
  readonly type = CREATE_TAG_FAILURE;

  constructor(public payload?: any) {}
}
export type Actions =
  | GetTagsListAction
  | GetTagsListSuccessAction
  | GetTagsListFailureAction
  | CreateTag
  | CreateTagSuccess
  | CreateTagFailure;
