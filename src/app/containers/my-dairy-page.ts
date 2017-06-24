import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers/index';
import {isLoggedIn} from '../reducers/user';

import * as diaryEntries from '../actions/diary-entries';

import { DiaryEntryService } from '../services/diary-entry';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-page',
  template: `
    <div [ngSwitch]="isLoggedIn">
      <div *ngSwitchCase="true">my dairy page</div>
      <div>
        <diary-entry-create></diary-entry-create>
      </div>
      <div>
        <diary-entry-list [entries]="diaryEntries$ | async"></diary-entry-list>
      </div>
      <div *ngSwitchCase="false">
        <diary-not-logged-in></diary-not-logged-in>
      </div>
    </div>
  `
})
export class MyDairyPageComponent {
  isLoggedIn: boolean;
  isLoggedIn$: Observable<boolean>;
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private cd: ChangeDetectorRef
  ) {
    this.isLoggedIn$ = store.select(fromRoot.getIsLoggedIn);
    this.diaryEntries$ = store.select(fromRoot.getEntries);
    this.isLoggedIn$
      .subscribe((newIsLoggedIn: boolean) => {
        this.isLoggedIn = newIsLoggedIn;
        this.cd.markForCheck();
      });

    this.store.dispatch(new diaryEntries.LoadListAction());
  }
}
