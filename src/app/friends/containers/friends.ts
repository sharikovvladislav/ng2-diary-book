import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers/index';
import * as fromFriends from '../reducers';

import * as friendsActions from '../actions/friends';

import { MdDialog } from '@angular/material';

import { Friend } from '../../shared/models/friend';
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
            Friends list [{{(friends$ | async)?.length}}]
          </ng-template>
          <friends-list
            [friends]="friends$ | async"
            [isGoToDiaries]="true"
            (goToDiary)="goToDiary($event)"
          ></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Rejected invites [{{(rejectedInvites$ | async)?.length}}]
          </ng-template>
          <friends-list [friends]="rejectedInvites$ | async"></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Pending invites [{{(pendingFriends$ | async)?.length}}]
          </ng-template>
          <friends-list
            [friends]="pendingFriends$ | async"
            [isPendingMode]="true"
            (accept)="onAccept($event)"
          ></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Pending invites outcome [{{(outcomePendingInvites$ | async)?.length}}]
          </ng-template>
          <friends-list [friends]="outcomePendingInvites$ | async"></friends-list>
        </md-tab>
      </md-tab-group>
    </common-show-if-logged-in>
  `,
})
export class FriendsComponent {
  friends$: Observable<Friend[]>;
  rejectedInvites$: Observable<Friend[]>;
  outcomePendingInvites$: Observable<Friend[]>;
  pendingFriends$: Observable<Friend[]>;

  constructor(
    public dialog: MdDialog,
    public store: Store<fromRoot.State>,
    public friendsStore: Store<fromFriends.State>,
    private router: Router,
  ) {
    this.friends$ = friendsStore.select(fromFriends.getFriends);
    this.friends$.subscribe(kek => console.log(kek));
    this.outcomePendingInvites$ = friendsStore.select(
      fromFriends.getPendingOutcomeInvites,
    );
    this.rejectedInvites$ = friendsStore.select(fromFriends.getRejectedInvites);
    this.pendingFriends$ = friendsStore.select(fromFriends.getPendingInvites);

    store.select(fromRoot.getUserIsLoggedIn).subscribe(isLoggedIn => {
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
