import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as friendsActions from '../actions/friends';

import {MdDialog, MdDialogRef} from '@angular/material';

import { Friend } from '../models/friend';
import { AddFriendDialogComponent } from './add-friend-dialog';

@Component({
  selector: 'friends-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <button md-button (click)="onAddFriendClick()">+ Add friend</button>
      <md-tab-group>
        <md-tab>
          <ng-template md-tab-label>
            Friends list
          </ng-template>
          <friends-list [friends]="friends$ | async"></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Rejected invites
          </ng-template>
          <friends-list [friends]="rejectedInvites$ | async"></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Pending invites
          </ng-template>
          <friends-pending-container></friends-pending-container>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Pending invites outcome
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

  constructor(
    public dialog: MdDialog,
    public store: Store<fromRoot.State>,
    ) {
    this.outcomePendingInvites$ = store.select(fromRoot.getPendingOutcomeInvites);
    this.outcomePendingInvites$
      .subscribe(next => console.log('', next));

    store.select(fromRoot.getIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          store.dispatch(new friendsActions.GetOutcomePendingInvitesAction());
        }
      });
  }

  onAddFriendClick() {
    this.dialog.open(AddFriendDialogComponent);
  }
}
