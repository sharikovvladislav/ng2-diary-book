import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import * as fromRoot from '../../reducers';
import * as routerActions from '../../core/actions/router';

import { DiaryEntryService } from '../services/diary-entry';

import * as diaryActions from '../actions/diary-entries';
import * as layoutActions from '../../core/actions/layout';

import { DiaryEntry } from 'ng2-diary-book-shared-models';
import { DiaryEntrySet } from 'ng2-diary-book-shared-models';

@Injectable()
export class DiaryEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(diaryActions.LOAD_LIST)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap(action => {
      return this.diaryEntryService
        .retrieveEntries(action.payload)
        .map(
          (diaryEntries: DiaryEntry[]) =>
            new diaryActions.LoadListSuccessAction(diaryEntries),
        )
        .catch(() => of(new diaryActions.LoadListFailureAction([])))
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(diaryActions.CREATE_ENTRY)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap((action: diaryActions.CreateEntryAction) => {
      return this.diaryEntryService
        .createEntry(<DiaryEntrySet>action.payload)
        .mergeMap((newEntryData: DiaryEntry) =>
          from([
            new diaryActions.CreateEntrySuccessAction(newEntryData),
            new routerActions.Go({ path: ['../..'] }),
            new diaryActions.LoadListAction(),
            new layoutActions.HideSpinnerAction(action.type),
          ]),
        )
        .catch(() =>
          from([
            new diaryActions.CreateEntryFailureAction([]),
            new layoutActions.HideSpinnerAction(action.type),
          ]),
        );
    });

  @Effect()
  edit$: Observable<Action> = this.actions$
    .ofType(diaryActions.EDIT_ENTRY)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap((action: diaryActions.EditEntryAction) => {
      return this.diaryEntryService
        .updateEntry(action.payload)
        .mergeMap((updatedEntryData: DiaryEntry) =>
          from([
            new diaryActions.EditEntrySuccessAction(updatedEntryData),
            new layoutActions.HideSpinnerAction(action.type),
            new routerActions.Go({ path: ['../..'] }),
            new diaryActions.GetEditEntryClearAction(),
            new diaryActions.LoadListAction(),
          ]),
        )
        .catch(() =>
          from([
            new diaryActions.EditEntryFailureAction(),
            new layoutActions.HideSpinnerAction(action.type),
          ]),
        );
    });

  @Effect()
  getEntryToEdit$: Observable<Action> = this.actions$
    .ofType(diaryActions.GET_EDIT_ENTRY)
    .do((action: any) =>
      this.store.dispatch(new layoutActions.ShowSpinnerAction(action.type)),
    )
    .switchMap((action: diaryActions.GetEditEntryAction) => {
      return this.diaryEntryService
        .getEntry(action.payload)
        .map(
          (entryToEdit: DiaryEntry) =>
            new diaryActions.GetEditEntrySuccessAction(entryToEdit),
        )
        .catch(() => of(new diaryActions.GetEditEntryFailureAction()))
        .do(({ type }) =>
          this.store.dispatch(new layoutActions.HideSpinnerAction(type)),
        );
    });

  constructor(
    private actions$: Actions,
    private diaryEntryService: DiaryEntryService,
    private store: Store<fromRoot.State>,
  ) {}
}
