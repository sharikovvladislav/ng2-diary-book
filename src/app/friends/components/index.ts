import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FriendsListComponent } from './friends-list';
import { EntryListComponent } from '../../core/components/entry-list';

import { PipesModule } from '../../shared/pipes';


export const COMPONENTS = [
  FriendsListComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    FormsModule,
    MdNativeDateModule,
    MdDatepickerModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
