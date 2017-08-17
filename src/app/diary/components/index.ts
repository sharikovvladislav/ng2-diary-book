import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DiaryComponent } from './diary';
import { EntryDetailComponent } from './entry-detail';
import { CommonDatePickerComponent } from './common-date-picker';

import { PipesModule } from '../../shared/pipes';

export const COMPONENTS = [
  DiaryComponent,
  EntryDetailComponent,
  CommonDatePickerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    PipesModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdDatepickerModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
