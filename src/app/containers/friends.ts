import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as friendsActions from '../actions/friends';

import {MdDialog, MdDialogRef} from '@angular/material';

import { Friend } from '../models/friend';
import { AddFriendDialogComponent } from './add-friend-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'friends-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <button md-button (click)="onAddFriendClick()">+ Add friend</button>
      <md-tab-group>
        <md-tab>
          <ng-template md-tab-label>
            Friends list [{{(friends$ | async).length}}]
          </ng-template>
          <friends-list
            [friends]="friends$ | async"
            [isGoToDiaries]="true"
            (goToDiary)="goToDiary($event)"
          ></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Rejected invites [{{(rejectedInvites$ | async).length}}]
          </ng-template>
          <friends-list [friends]="rejectedInvites$ | async"></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Pending invites [{{(pendingFriends$ | async).length}}]
          </ng-template>
          <friends-list
            [friends]="pendingFriends$ | async"
            [isPendingMode]="true"
            (accept)="onAccept($event)"
          ></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Pending invites outcome [{{(outcomePendingInvites$ | async).length}}]
          </ng-template>
          <friends-list [friends]="outcomePendingInvites$ | async"></friends-list>
        </md-tab>
      </md-tab-group>
    </common-show-if-logged-in>
  `
})
export class FriendsComponent {
  friends$: Observable<Friend[]>;
  rejectedInvites$: Observable<Friend[]>;
  outcomePendingInvites$: Observable<Friend[]>;
  pendingFriends$: Observable<Friend[]>;

  constructor(
    public dialog: MdDialog,
    public store: Store<fromRoot.State>,
    private router: Router,
    ) {
    this.friends$ = store.select(fromRoot.getFriends);
    this.outcomePendingInvites$ = store.select(fromRoot.getPendingOutcomeInvites);
    this.rejectedInvites$ = store.select(fromRoot.getRejectedFriends);
    this.pendingFriends$ = store.select(fromRoot.getPendingFriends);

    store.select(fromRoot.getIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          store.dispatch(new friendsActions.GetAllListsAction());
        }
      });
  }

  onAddFriendClick() {
    this.dialog.open(AddFriendDialogComponent);
  }

  onAccept(email: string) {
    this.store.dispatch(new friendsActions.AcceptInviteAction(email));
  }

  goToDiary(friend: any) {
    this.router.navigate(['/friends/diaryEntries', friend.uid]);
  }
}
