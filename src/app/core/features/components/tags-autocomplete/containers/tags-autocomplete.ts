import { Component } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

@Component({
  selector: 'tags-auto-complete',
  template: `
    hello world!
    <tags-internal-auto-complete-input
      [selectedTags]="selectedTagsTestData"
      (deleteTag)="onDeleteSelected($event);"
    ></tags-internal-auto-complete-input>
    <tags-internal-auto-complete-results
      [data]="queryResultsTestData"
      (selectTag)="onResultSelect($event);"
    ></tags-internal-auto-complete-results>
  `,
})
export class TagsAutoCompleteContainerComponent {
  selectedTagsTestData: Tag[] = [{ name: 'здоровье' }, { name: '52недели' }];
  queryResultsTestData: Tag[] = [
    { name: 'секс' },
    { name: 'спина' },
    { name: 'сделал-сам' },
  ];

  onResultSelect(tag: Tag): void {
    console.log('add tag', tag);
  }

  onDeleteSelected(tag: Tag): void {
    console.log('delete tag', tag);
  }
}
