import { Action } from '@ngrx/store';

export const OPEN_SIDENAV =   '[Layout] Open Sidenav';
export const CLOSE_SIDENAV =  '[Layout] Close Sidenav';

export const SHOW_SPINNER =   '[Spinner] Show Spinner';
export const HIDE_SPINNER =   '[Spinner] Hide Spinner';


export class OpenSidenavAction implements Action {
  readonly type = OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  readonly type = CLOSE_SIDENAV;
}

export class ShowSpinnerAction implements Action {
  readonly type = SHOW_SPINNER;
}

export class HideSpinnerAction implements Action {
  readonly type = HIDE_SPINNER;
}


export type Actions
  = OpenSidenavAction
  | CloseSidenavAction
  | ShowSpinnerAction
  | HideSpinnerAction;
