import { Component, EventEmitter } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

@Component({
  selector: 'tags-auto-complete',
  template: `
    hello world!
    <tags-internal-auto-complete-input
      [selectedTags]="selectedTagsTestData"
      [clearInputValue]="clearInputValueEmitter"
      (inputChanged)="onInputChange($event);"
      (deleteTag)="onDeleteSelected($event);"
    ></tags-internal-auto-complete-input>
    <tags-internal-auto-complete-results
      [data]="queryResultsTestData"
      (selectTag)="onResultSelect($event);"
    ></tags-internal-auto-complete-results>
    <button (click)="clearInput();"></button>
  `,
})
export class TagsAutoCompleteContainerComponent {
  selectedTagsTestData: Tag[] = [{ name: 'здоровье' }, { name: '52недели' }];
  queryResultsTestData: Tag[] = [
    { name: 'секс' },
    { name: 'спина' },
    { name: 'сделал-сам' },
  ];
  clearInputValueEmitter = new EventEmitter();

  onResultSelect(tag: Tag): void {
    console.log('add tag', tag);
  }

  onDeleteSelected(tag: Tag): void {
    console.log('delete tag', tag);
  }

  onInputChange(query: string): void {
    console.log('query changed: ', query);
  }

  clearInput() {
    this.clearInputValueEmitter.emit();
  }
}
