import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as friendsActions from '../actions/friends';

@Component({
  selector: 'friends-add',
  template: `
    <div>
      <md-input-container>
        <input mdInput [(ngModel)]="email"/>
      </md-input-container>
      <button md-button (click)="onAddClick();">Add friend</button>
    </div>
  `
})
export class AddFriendComponent {
  email: string;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.email = '';
  }

  onAddClick() {
    this.store.dispatch(new friendsActions.CreateFriendshipAction(this.email));
  }
}
