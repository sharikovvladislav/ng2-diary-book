import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DiaryEntry } from 'ng2-diary-book-shared-models';
import { Store } from '@ngrx/store';

import * as diaryActions from '../actions/diary-entries';
import * as routerActions from '../../core/actions/router';
import * as fromDiary from '../reducers';
import * as fromRoot from '../../reducers';

@Component({
  template: `
    <md-card>
      <md-card-header>
        <h4>Изменение записи</h4><span (click)="goBack();">Назад <md-icon><i class="material-icons">arrow_back</i></md-icon></span>
      </md-card-header>
      <diary-entry-edit
        [entry]="entryToEdit$ | async"
      ></diary-entry-edit>
    </md-card>
  `,
})
export class EntryEditContainer {
  entryToEdit$: Observable<DiaryEntry>;

  goBack() {
    this.store.dispatch(
      new routerActions.Go({
        path: ['../..'],
        extras: { relativeTo: this.route },
      }),
    );
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromDiary.State>,
  ) {
    store
      .select(fromRoot.getUserIsLoggedIn)
      .filter(isUserLoggedIn => isUserLoggedIn)
      .subscribe(() => {
        this.route.paramMap.subscribe((params: ParamMap) =>
          this.store.dispatch(
            new diaryActions.GetEditEntryAction(params.get('key')),
          ),
        );
      });
    this.entryToEdit$ = this.store.select(fromDiary.getDiaryToEditEntry);
  }
}
