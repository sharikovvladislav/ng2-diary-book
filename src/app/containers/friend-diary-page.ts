import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import * as fromRoot from '../reducers/index';

import * as friendActions from '../actions/friends';

import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <div>
        <diary-entry-list
          [entries]="diaryEntries$ | async"
        ></diary-entry-list>
      </div>
    </common-show-if-logged-in>
  `
})
export class FriendDiaryEntriesComponent implements OnInit {
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              ) {
    // this.diaryEntries$ = store.select(fromRoot.getEntries);
  }

  ngOnInit(): void {
    this.diaryEntries$ = this.store.select(fromRoot.getFriendDiaryEntries);
    this.store.select(fromRoot.getIsLoggedIn)
      .filter(isLoggedIn => !!isLoggedIn)
      .subscribe(() =>
        this.route.paramMap
          .subscribe((params: any) =>
             this.store.dispatch(new friendActions.GetFriendDiaryEntriesAction(params.get('friendUid')))
          )
      );
  }
}
