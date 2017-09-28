import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TagsAutoCompleteContainerComponent } from './containers/tags-autocomplete';
import { TagsAutoCompleteInputComponent } from './components/input';
import { TagsAutoCompleteResultsComponent } from './components/results';

@NgModule({
  imports: [HttpClientModule],
  declarations: [
    TagsAutoCompleteContainerComponent,
    TagsAutoCompleteInputComponent,
    TagsAutoCompleteResultsComponent,
  ],
  exports: [TagsAutoCompleteContainerComponent],
})
export class TagsAutoCompleteModule {}
