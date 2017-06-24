import 'rxjs/add/operator/let';
import {Observable} from 'rxjs/Observable';
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as layout from '../actions/layout';
import * as user from '../actions/user';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item (activate)="closeSidenav()" routerLink="/diary/my-dairy" icon="book" hint="View your diary">
          My dairy
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/book/collection" icon="book"
                     hint="View your book collection">
          My Collection
        </bc-nav-item>
        <bc-nav-item (activate)="closeSidenav()" routerLink="/book/find" icon="search" hint="Find your next book!">
          Browse Books
        </bc-nav-item>
        <bc-nav-item *ngIf="!(isLoggedIn$ | async)" (activate)="login()">
          Login
        </bc-nav-item>
        <bc-nav-item *ngIf="isLoggedIn$ | async" (activate)="logout()">
          Logout
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        Diary
      </bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `
})
export class AppComponent implements OnInit {
  showSidenav$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<firebase.User>;

  ngOnInit() {
    this.user$
      .subscribe((providerData: any) => {
        if (providerData !== null) {
          const userData = {
            displayName: providerData.displayName,
            email: providerData.email,
            uid: providerData.uid
          };
          this.store.dispatch(new user.LoadUserAction(userData));
        } else {
          this.store.dispatch(new user.UnloadUserAction());
        }
      });
  }

  constructor(private store: Store<fromRoot.State>, public afAuth: AngularFireAuth) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.isLoggedIn$ = this.store.select(fromRoot.getIsLoggedIn);
    this.user$ = afAuth.authState;
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.closeSidenav();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.closeSidenav();
  }
}
