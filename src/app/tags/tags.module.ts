import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TagsManagerContainer } from './containers/tags-manager';
import { TagsRootContainer } from './containers/root';

import { TagsService } from '../core/services/tags';

import { TagsEffects } from './effects/tags';

import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

import { TagsAddContainer } from './containers/tags-add';
import { TagsEditContainer } from './containers/tags-edit';
import { TagsEditorComponent } from './components/tags-editor';

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: TagsRootContainer,
        data: {
          isRoot: true,
        },
        children: [
          {
            path: 'edit/:tagId',
            component: TagsEditContainer,
            data: {
              breadcrumb: 'Edit tag',
            },
          },
          {
            path: 'add',
            component: TagsAddContainer,
            data: {
              breadcrumb: 'Add tag',
            },
          },
          {
            path: '',
            component: TagsManagerContainer,
            data: {
              breadcrumb: 'Tags list',
            },
          },
        ],
      },
    ]),

    StoreModule.forFeature('tags', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([TagsEffects]),
  ],
  declarations: [
    TagsManagerContainer,
    TagsRootContainer,
    TagsEditContainer,
    TagsAddContainer,
    TagsEditorComponent,
  ],
})
export class TagsModule {}
