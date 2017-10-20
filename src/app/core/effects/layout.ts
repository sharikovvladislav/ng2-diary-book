import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as layoutAction from '../actions/layout';

@Injectable()
export class LayoutEffects {
  spinnerContainerElementRef: any;

  @Effect({ dispatch: false })
  showSpinner$ = this.actions$.ofType(layoutAction.SHOW_SPINNER).do(() => {
    this.spinnerContainerElementRef.focus();
  });

  constructor(private actions$: Actions) {
    console.log('constructor');
    this.spinnerContainerElementRef = document.getElementsByTagName(
      'app-loader',
    )[0];
  }
}
