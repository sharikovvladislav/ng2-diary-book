import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import {Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../reducers';

import { DiaryEntryService } from '../services/diary-entry';
import * as diaryEntry from '../actions/diary-entries';

import { DiaryEntry } from '../models/diary-entry';
import { DiaryEntrySet } from '../models/diary-entry-set';

import * as moment from 'moment';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class DiaryEntriesEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(diaryEntry.LOAD_LIST)
    .withLatestFrom(this.store)
    .filter(([action, state]) => fromRoot.getIsLoggedIn(state))
    .switchMap(([action, state]) => {
      const uid = fromRoot.getUid(state);

      return this.diaryEntryService.retrieveEntries(uid)
        .map((diaryEntries: DiaryEntry[]) => new diaryEntry.LoadListSuccessAction(diaryEntries))
        .catch(() => of(new diaryEntry.LoadListFailureAction([])));
    });

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(diaryEntry.CREATE_ENTRY)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const uid = fromRoot.getUid(state);

      return this.diaryEntryService.createEntry(uid, action.payload)
        .map((newEntryData: DiaryEntry) => new diaryEntry.CreateEntrySuccessAction(newEntryData))
        .catch(() => of(new diaryEntry.CreateEntryFailureAction([])));
    });

  @Effect()
  edit$: Observable<Action> = this.actions$
    .ofType(diaryEntry.EDIT_ENTRY)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const uid = fromRoot.getUid(state);

      return this.diaryEntryService.updateEntry(uid, action.payload)
        .map((updatedEntryData: DiaryEntry) =>
          new diaryEntry.EditEntrySuccessAction(updatedEntryData)
        )
        .do(() => this.store.dispatch(new diaryEntry.LoadListAction()))
        .catch(() => of(new diaryEntry.EditEntryFailureAction(null)));
    });

    constructor(
      private actions$: Actions,
      private diaryEntryService: DiaryEntryService,
      private store: Store<fromRoot.State>,
    ) { }
}
