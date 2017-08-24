import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components';

import { AddFriendDialogComponent } from './containers/add-friend-dialog';
import { AddFriendComponent } from './containers/add-friend';
import { FriendDiaryEntriesComponent } from './containers/friend-diary-page';
import { FriendsComponent } from './containers/friends';

import { FriendsService } from './services/friends';

import { FriendsEffects } from './effects/friends';

import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendsComponent,
        data: {
          breadcrumb: 'Friends',
        },
      },
      {
        path: 'diaryEntries/:friendUid',
        component: FriendDiaryEntriesComponent,
        data: {
          breadcrumb: 'Friend diary',
        },
      },
    ]),

    HttpClientModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('friends', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([FriendsEffects]),
  ],
  declarations: [
    AddFriendDialogComponent,
    AddFriendComponent,
    FriendDiaryEntriesComponent,
    FriendsComponent,
  ],
  providers: [FriendsService],
  entryComponents: [AddFriendDialogComponent],
})
export class FriendsModule {}
