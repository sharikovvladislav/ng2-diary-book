import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers, CustomSerializer } from './reducers';

import { routes } from './routes';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app';

import 'hammerjs';

console.log(environment.production);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 50 })
      : [],

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
