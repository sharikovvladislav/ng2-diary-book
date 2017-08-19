import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components';
import { EntryEditDialogComponent } from './containers/edit-entry-dialog';
import { EntryCreateDialogComponent } from './containers/create-entry-dialog';
import { EntryEditContainerComponent } from './containers/entry-edit-container';
import { EntryCreateContainerComponent } from './containers/entry-create-container';
import { MyDairyPageComponent } from './containers/my-dairy-page';
import { DiaryEffects } from './effects/diary';

import { DialogFactoryService } from './services/dialog-factory';
import { DiaryProcessorService } from './services/diary-processor';
import { DiaryEntryService } from './services/diary-entry';

import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    CoreModule,

    MdButtonModule,

    RouterModule.forChild([
      { path: '', component: MyDairyPageComponent },
    ]),

    HttpClientModule,

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
    EntryCreateDialogComponent,
    EntryEditContainerComponent,
    EntryCreateContainerComponent,
    MyDairyPageComponent,
  ],
  providers: [DialogFactoryService, DiaryProcessorService, DiaryEntryService],
  entryComponents: [
    EntryEditDialogComponent,
    EntryCreateDialogComponent,
  ]
})
export class DiaryModule {}
