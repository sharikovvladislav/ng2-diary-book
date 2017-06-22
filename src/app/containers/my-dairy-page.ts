import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers/index';
import {isLoggedIn} from '../reducers/user';

@Component({
  selector: 'diary-page',
  template: `
    <div [ngSwitch]="isLoggedIn">
      <div *ngSwitchCase="true">my dairy page</div>
      <div *ngSwitchCase="false">
        <diary-not-logged-in></diary-not-logged-in>
      </div>
    </div>
  `
})
export class MyDairyPageComponent {
  isLoggedIn: boolean;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private cd: ChangeDetectorRef) {
    this.isLoggedIn$ = store.select(fromRoot.getIsLoggedIn);
    this.isLoggedIn$
      .subscribe((newIsLoggedIn: boolean) => {
        this.isLoggedIn = newIsLoggedIn;
        this.cd.markForCheck();
      });
  }
}
