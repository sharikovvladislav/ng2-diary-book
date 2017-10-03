import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import * as fromRoot from '../../reducers/index';
import * as fromFriends from '../reducers';

import * as friendActions from '../actions/friends';

import { DiaryEntry } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'diary-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <div>
        <diary-entries-list
          [entries]="diaryEntries$ | async"
          [isEditDisabled]="true"
        ></diary-entries-list>
      </div>
    </common-show-if-logged-in>
  `,
})
export class FriendDiaryEntriesComponent implements OnInit {
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(
    private store: Store<fromFriends.State>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.diaryEntries$ = this.store.select(fromFriends.getFriendDiaryEntries);
    this.store
      .select(fromRoot.getUserIsLoggedIn)
      .filter(isLoggedIn => !!isLoggedIn)
      .subscribe(() =>
        this.route.paramMap.subscribe((params: any) =>
          this.store.dispatch(
            new friendActions.GetFriendDiaryEntriesAction(
              params.get('friendUid'),
            ),
          ),
        ),
      );
  }
}
