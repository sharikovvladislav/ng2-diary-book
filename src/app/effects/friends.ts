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

import * as friendsActions from '../actions/friends';
import { FriendsService } from '../services/friends';

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
export class FriendsEffects {
  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(friendsActions.CREATE_FRIENDSHIP)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const userData = fromRoot.getUser(state);

      return this.friendsService.sendInvite(action.payload, userData)
        .map((data: any) => new friendsActions.CreateFriendshipSuccessAction())
        .catch(() => of(new friendsActions.CreateFriendshipFailureAction()));
    });

  @Effect()
  getPendingInvites$: Observable<Action> = this.actions$
    .ofType(friendsActions.GET_PENDING_INVITES)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const { email } = fromRoot.getUser(state);

      return this.friendsService.getPendingInvites(email)
        .map((data: any) => {
          return new friendsActions.GetPendingInvitesSuccessAction(data);
        })
        .catch((kek) => {
          return of(new friendsActions.GetPendingInvitesFailureAction(null));
        });
    });

  @Effect()
  getOutcomePendingInvites$: Observable<Action> = this.actions$
    .ofType(friendsActions.GET_OUTCOME_PENDING_INVITES)
    .withLatestFrom(this.store)
    .switchMap(([action, state]) => {
      const { email } = fromRoot.getUser(state);

      return this.friendsService.getOutcomePendingInvites(email)
        .map((data: any) => {
          return new friendsActions.GetOutcomePendingInvitesSuccessAction(data);
        })
        .catch((kek) => {
          return of(new friendsActions.GetOutcomePendingInvitesFailureAction(null));
        });
    });

    constructor(
      private actions$: Actions,
      private friendsService: FriendsService,
      private store: Store<fromRoot.State>,
    ) { }
}
