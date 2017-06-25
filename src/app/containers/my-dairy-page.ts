import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as diaryEntries from '../actions/diary-entries';

import {DiaryEntry} from '../models/diary-entry';

@Component({
  selector: 'diary-page',
  template: `
    <common-show-if-logged-in>
      <div>
        <diary-entry-create></diary-entry-create>
      </div>
      <div>
        <diary-entry-list [entries]="diaryEntries$ | async"></diary-entry-list>
      </div>
    </common-show-if-logged-in>
  `
})
export class MyDairyPageComponent {
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.diaryEntries$ = store.select(fromRoot.getEntries);
    store.select(fromRoot.getIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.store.dispatch(new diaryEntries.LoadListAction());
        }
      });
  }
}
