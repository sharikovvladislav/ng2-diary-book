import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@angular/material';

import { ComponentsModule } from './components';
import { BookEffects } from './effects/book';
import { DiaryEntriesEffects } from './effects/diary-entries';
import { CollectionEffects } from './effects/collection';
import { BookExistsGuard } from './guards/book-exists';

import { AppComponent } from './containers/app';
import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { SelectedBookPageComponent } from './containers/selected-book-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { MyDairyPageComponent } from './containers/my-dairy-page';
import { EntryCreateContainerComponent } from './containers/entry-create-container';
import { EntryEditContainerComponent } from './containers/entry-edit-container';

import { EntryEditDialogComponent } from './containers/edit-entry-dialog';
import { EntryCreateDialogComponent } from './containers/create-entry-dialog';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { GoogleBooksService } from './services/google-books';
import { DiaryEntryService } from './services/diary-entry';

import { routes } from './routes';
import { reducer } from './reducers';
import { schema } from './db';

import { environment } from '../environments/environment';
import { CommonShowIfLoggedInComponent } from './containers/common-show-if-logged-in';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(BookEffects),
    EffectsModule.run(CollectionEffects),
    EffectsModule.run(DiaryEntriesEffects),

    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    DBModule.provideDB(schema),
  ],
  declarations: [
    AppComponent,
    FindBookPageComponent,
    SelectedBookPageComponent,
    ViewBookPageComponent,
    CollectionPageComponent,
    NotFoundPageComponent,
    MyDairyPageComponent,
    EntryCreateContainerComponent,
    EntryEditContainerComponent,
    CommonShowIfLoggedInComponent,
    EntryEditDialogComponent,
    EntryCreateDialogComponent,
  ],
  providers: [
    BookExistsGuard,
    GoogleBooksService,
    DiaryEntryService
  ],
  entryComponents: [
    EntryEditDialogComponent,
    EntryCreateDialogComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
