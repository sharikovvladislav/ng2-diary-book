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
      <div class="text">
        <span>{{displayName$ | async}}</span>
      </div>
      <span class="exit-button"></span>
    </div>
  `,
  styles: [
    `.image > img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }`,
  ],
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
