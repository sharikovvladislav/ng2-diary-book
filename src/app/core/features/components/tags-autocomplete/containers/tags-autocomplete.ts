import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { TagsService } from '../../../../services/tags';

@Component({
  selector: 'tags-auto-complete',
  template: `
    hello world!
    <tags-internal-auto-complete-input
      [selectedTags]="selectedTags"
      [clearInputValue]="clearInputValueEmitter"
      (inputChanged)="onInputChange($event);"
      (deleteTag)="onDeleteSelected($event);"
    ></tags-internal-auto-complete-input>
    <tags-internal-auto-complete-results
      [data]="queryResultsTags"
      (selectTag)="onResultSelect($event);"
    ></tags-internal-auto-complete-results>
  `,
})
export class TagsAutoCompleteContainerComponent implements OnInit {
  inputChanged = new Subject<string>();

  selectedTags: Tag[] = [
    { id: 1, name: 'здоровье' },
    { id: 5, name: '52недели' },
  ];
  queryResultsTags: Tag[] = [];
  clearInputValueEmitter = new EventEmitter();

  ngOnInit() {
    this.inputChanged
      .do(inputValue => {
        // очистим результат если очистили поле
        if (inputValue.length === 0) {
          this.queryResultsTags = [];
        }
      })
      .filter(inputValue => inputValue.length > 0)
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.tagsService.getTagsList(query))
      .do(() => this.changeDetectorRef.markForCheck())
      .subscribe(
        // уберем уже выбранные теги
        (tags: Tag[]) =>
          (this.queryResultsTags = tags.filter(
            tag =>
              !this.selectedTags
                .map(selectedTag => selectedTag.name)
                .includes(tag.name),
          )),
      );
  }

  onResultSelect(tag: Tag): void {
    this.selectedTags.push(tag);
    this.clearInputValueEmitter.emit();
    this.queryResultsTags = [];
  }

  onDeleteSelected(tagToDelete: Tag): void {
    this.selectedTags = this.selectedTags.filter(
      tag => tag.id !== tagToDelete.id,
    );
  }

  onInputChange(query: string): void {
    this.inputChanged.next(query);
  }

  constructor(
    private tagsService: TagsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}
}
