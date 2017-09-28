import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TagsAutoCompleteContainerComponent } from './containers/tags-autocomplete';
import { TagsAutoCompleteInputComponent } from './components/input';
import { TagsAutoCompleteResultsComponent } from './components/results';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  declarations: [
    TagsAutoCompleteContainerComponent,
    TagsAutoCompleteInputComponent,
    TagsAutoCompleteResultsComponent,
  ],
  exports: [TagsAutoCompleteContainerComponent],
})
export class TagsAutoCompleteModule {}
