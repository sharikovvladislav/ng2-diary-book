import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TagsAutoCompleteContainerComponent } from './containers/tags-autocomplete';
import { TagsAutoCompleteInputComponent } from './components/input';
import { TagsAutoCompleteResultsComponent } from './components/results';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagsService } from '../../../services/tags';

// TODO To remove
import { InMemoryDataService } from '../../../http-mocks/in-memory-data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
    }),
  ],
  declarations: [
    TagsAutoCompleteContainerComponent,
    TagsAutoCompleteInputComponent,
    TagsAutoCompleteResultsComponent,
  ],
  exports: [TagsAutoCompleteContainerComponent],
  providers: [TagsService],
})
export class TagsAutoCompleteModule {}
