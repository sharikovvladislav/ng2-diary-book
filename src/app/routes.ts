import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page';

const routes: Routes = [
  { path: '', redirectTo: '/diary', pathMatch: 'full' },
  {
    path: 'diary',
    loadChildren: './diary/diary.module#DiaryModule',
    data: {
      breadcrumb: 'Diary',
    },
  },
  {
    path: 'friends',
    loadChildren: './friends/friends.module#FriendsModule',
    data: {
      breadcrumb: 'Friends',
    },
  },
  {
    path: 'tags',
    loadChildren: './tags/tags.module#TagsModule',
    data: {
      breadcrumb: 'Tags management',
    },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: {
      breadcrumb: 'Not found',
    },
  },
];

const devRoutes: Routes = [
  {
    path: 'components-showcase',
    loadChildren: './core/features/features.module#FeaturesModule',
    data: {
      breadcrumb: 'Components showcase',
    },
  },
];

export function getRoutes(isDevEnv) {
  return isDevEnv ? [...devRoutes, ...routes] : routes;
}
