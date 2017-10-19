import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-info',
  template: `
    <app-user-info-component
      [photoURL]="photoURL$ | async"
      [displayName]="displayName$ | async"
      (onExit)="onExitClick();"
    ></app-user-info-component>
  `,
})
export class UserInfoContainer {
  displayName$: Observable<string>;
  photoURL$: Observable<string>;

  constructor(private store: Store<fromRoot.State>, private auth: AuthService) {
    store
      .select(fromRoot.getUserIsLoggedIn)
      .filter(isUserLoggedIn => isUserLoggedIn)
      .subscribe(() => {
        this.displayName$ = store.select(fromRoot.getDisplayName);
        this.photoURL$ = store.select(fromRoot.getPhotoURL);
      });
  }

  onExitClick(): void {
    this.auth.logout();
  }
}
