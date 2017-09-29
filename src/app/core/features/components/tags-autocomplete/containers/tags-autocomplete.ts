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
    <button (click)="clearInput();">Clear input</button>
  `,
})
export class TagsAutoCompleteContainerComponent implements OnInit {
  inputChanged = new Subject<string>();

  selectedTags: Tag[] = [{ name: 'здоровье' }, { name: '52недели' }];
  queryResultsTags: Tag[] = [];
  clearInputValueEmitter = new EventEmitter();

  ngOnInit() {
    this.inputChanged
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
  }

  onDeleteSelected(tag: Tag): void {
    console.log('delete tag', tag);
  }

  onInputChange(query: string): void {
    this.inputChanged.next(query);
  }

  clearInput() {
    this.clearInputValueEmitter.emit();
  }

  constructor(
    private tagsService: TagsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}
}
