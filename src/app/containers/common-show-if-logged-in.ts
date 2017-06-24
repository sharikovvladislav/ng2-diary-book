import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';

@Component({
  selector: 'common-show-if-logged-in',
  template: `
    <div [ngSwitch]="isLoggedIn$ | async">
      <div *ngSwitchCase="true">
        <ng-content></ng-content>
      </div>
      <div *ngSwitchCase="false">
        <diary-not-logged-in></diary-not-logged-in>
      </div>
    </div>
  `
})

export class CommonShowIfLoggedInComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.isLoggedIn$ = store.select(fromRoot.getIsLoggedIn);
  }
}
