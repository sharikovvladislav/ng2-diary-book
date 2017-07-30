import { Routes } from '@angular/router';

import { BookExistsGuard } from './guards/book-exists';
import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { MyDairyPageComponent } from './containers/my-dairy-page';
import { FriendsComponent } from './containers/friends';
import { FriendDiaryEntriesComponent } from './containers/friend-diary-page';

export const routes: Routes = [
  {
    path: '',
    component: MyDairyPageComponent
  },
  {
    path: 'diary/my-dairy',
    component: MyDairyPageComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'friends/diaryEntries/:friendUid',
    component: FriendDiaryEntriesComponent
  },
  {
    path: 'book/collection',
    component: CollectionPageComponent
  },
  {
    path: 'book/find',
    component: FindBookPageComponent
  },
  {
    path: 'book/:id',
    canActivate: [ BookExistsGuard ],
    component: ViewBookPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
