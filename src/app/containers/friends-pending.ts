import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as friendsActions from '../actions/friends';

import { Friend } from '../models/friend';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'friends-pending-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <friends-list
      [friends]="pendingFriends$ | async"
      [isPendingMode]="true"
      (accept)="onAccept($event)"
    ></friends-list>
  `
})
export class FriendsPendingComponent {
  pendingFriends$: Observable<Friend[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.pendingFriends$ = store.select(fromRoot.getPendingFriends);

    store.select(fromRoot.getIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          store.dispatch(new friendsActions.GetPendingInvitesAction());
        }
      });
  }

  onAccept(event: any) {
    this.store.dispatch(new friendsActions.AcceptInviteAction(event.email));
  }
}
