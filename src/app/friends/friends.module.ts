import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';

import { AddFriendDialogComponent } from './containers/add-friend-dialog';
import { AddFriendComponent } from './containers/add-friend';
import { FriendDiaryEntriesComponent } from './containers/friend-diary-page';
import { FriendsComponent } from './containers/friends';
import { FriendRootContainer } from './containers/root';

import { FriendsService } from './services/friends';

import { FriendsEffects } from './effects/friends';

import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

import { ComponentsModule as DiaryComponentsModule } from '../diary/components/index';

@NgModule({
  imports: [
    CoreModule,
    ComponentsModule,
    DiaryComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FriendRootContainer,
        data: {
          isRoot: true,
        },
        children: [
          {
            path: ':friendUid/diary',
            component: FriendDiaryEntriesComponent,
            data: {
              breadcrumb: 'Friend diary',
            },
          },
          {
            path: '',
            component: FriendsComponent,
            data: {
              breadcrumb: 'Friends list',
            },
          },
        ],
      },
    ]),

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
    FriendRootContainer,
  ],
  providers: [FriendsService],
  entryComponents: [AddFriendDialogComponent],
})
export class FriendsModule {}
