import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { EntryEditDialogComponent } from './containers/edit-entry-dialog';
import { EntryEditContainerComponent } from './containers/entry-edit-container';
import { EntryCreateContainerComponent } from './containers/entry-create-container';
import { MyDairyPageComponent } from './containers/my-dairy-page';
import { DiaryEffects } from './effects/diary';
import { DiaryRootComponent } from './containers/root';

import { DiaryProcessorService } from './services/diary-processor';
import { DiaryEntryService } from './services/diary-entry';

import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { EntryCreateContainer } from './containers/entry-create-page';
import { EntryEditContainer } from './containers/entry-edit-page';

@NgModule({
  imports: [
    ComponentsModule,
    CoreModule,

    RouterModule.forChild([
      {
        path: '',
        component: DiaryRootComponent,
        data: {
          breadcrumb: 'Dairy',
        },
        children: [
          {
            path: ``,
            component: MyDairyPageComponent,
            data: {
              breadcrumb: 'My diary',
            },
          },
          {
            path: 'edit/:key',
            component: EntryEditContainer,
            data: {
              breadcrumb: 'Create entry',
            },
          },
          {
            path: 'add',
            component: EntryCreateContainer,
            data: {
              breadcrumb: 'Create entry',
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
    StoreModule.forFeature('diary', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([DiaryEffects]),
  ],
  declarations: [
    EntryEditDialogComponent,
    EntryEditContainerComponent,
    EntryCreateContainerComponent,
    MyDairyPageComponent,
    DiaryRootComponent,
    EntryCreateContainer,
    EntryEditContainer,
  ],
  providers: [DiaryProcessorService, DiaryEntryService],
  entryComponents: [EntryEditDialogComponent],
})
export class DiaryModule {}
