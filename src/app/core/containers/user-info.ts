import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-user-info',
  template: `
    <div class="user-info">
      <div class="image" *ngIf="hasPhotoURL()">
        <img src="{{photoURL$ | async}}" />
      </div>
      <div class="name">
        <span>{{displayName$ | async}}</span>
      </div>
      <span class="exit-button">
        <md-icon>exit_to_app</md-icon>
      </span>
    </div>
  `,
  styleUrls: ['./user-info.css'],
})
export class UserInfoContainer {
  displayName$: Observable<string>;
  photoURL$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>,
    private ref: ChangeDetectorRef,
  ) {
    store
      .select(fromRoot.getUserIsLoggedIn)
      .filter(isUserLoggedIn => isUserLoggedIn)
      .subscribe(() => {
        this.displayName$ = store.select(fromRoot.getDisplayName);
        this.photoURL$ = store.select(fromRoot.getPhotoURL);
      });
  }

  hasPhotoURL(): boolean {
    const pipe = new AsyncPipe(this.ref);
    const value = pipe.transform(this.photoURL$);

    return value !== null;
  }
}
