import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page';
import { LulComponent } from './core/containers/lul';
import { KekComponent } from './core/containers/kek';

export const routes: Routes = [
  // {path: '/', redirectTo: '/', pathMatch: 'full'},
  {
    path: 'diary',
    loadChildren: './diary/diary.module#DiaryModule',
  },
  {
    path: 'friends',
    loadChildren: './friends/friends.module#FriendsModule',
  },
  { path: '', component: KekComponent },
  { path: 'lul', component: LulComponent },
  { path: '**', component: NotFoundPageComponent },
];
