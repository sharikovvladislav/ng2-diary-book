import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as layout from '../actions/layout';
import * as user from '../actions/user';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-loader>
      <bc-layout>
        <bc-sidenav [open]="showSidenav$ | async">
          <bc-nav-item (activate)="closeSidenav()" routerLink="/diary" icon="chat" hint="View your diary">
            My dairy
          </bc-nav-item>
          <bc-nav-item (activate)="closeSidenav()" routerLink="/tags" icon="supervisor_account" hint="Tags management">
            Tags
          </bc-nav-item>
          <bc-nav-item *ngIf="!isProduction();"
                       (activate)="closeSidenav()"
                       routerLink="/components-showcase"
                       icon="supervisor_account"
                       hint="Examples of component usage"
          >
            Components showcase
          </bc-nav-item>
          <bc-nav-item *ngIf="!(isLoggedIn$ | async)" (activate)="login()">
            Login
          </bc-nav-item>
          <bc-nav-item *ngIf="isLoggedIn$ | async" (activate)="logout()">
            Logout
          </bc-nav-item>
        </bc-sidenav>
        <bc-toolbar (openMenu)="openSidenav()">
            <div class="header">
              <div>
                Diary
              </div>
              <app-user-info></app-user-info>
            </div>
        </bc-toolbar>
        <div (click)="closeSidenav();">
          <div class="contents">
            <app-breadcrumbs></app-breadcrumbs>
            <router-outlet></router-outlet>
          </div>
        </div>
      </bc-layout>
    </app-loader>
  `,
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
  showSidenav$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  ngOnInit() {
    this.authService.user$.subscribe((providerData: any) => {
      if (providerData !== null) {
        providerData.getIdToken(true).then((token: string) => {
          console.log(token);
          const userData = {
            token: token,
            displayName: providerData.displayName,
            email: providerData.email,
            uid: providerData.uid,
            photoURL: providerData.photoURL,
          };
          this.store.dispatch(new user.LoadUserAction(userData));
        });
      } else {
        this.store.dispatch(new user.UnloadUserAction());
      }
    });
  }

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
  ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.isLoggedIn$ = this.store.select(fromRoot.getUserIsLoggedIn);
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
    this.authService.login();
    this.closeSidenav();
  }

  logout() {
    this.authService.logout();
    this.closeSidenav();
  }

  isProduction() {
    return environment.production;
  }
}
