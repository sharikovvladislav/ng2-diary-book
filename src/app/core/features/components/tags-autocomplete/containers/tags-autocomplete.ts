import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
    <tags-internal-auto-complete-input
      [selectedTags]="selectedTagsValue"
      [clearInputValue]="clearInputValueEmitter"
      [focusInputField]="focusInputFieldEmitter"
      (inputChanged)="onInputChange($event);"
      (deleteTag)="onDeleteSelected($event);"
    ></tags-internal-auto-complete-input>
    <tags-internal-auto-complete-results
      [class.hidden]="queryResultsTags.length === 0"
      [data]="queryResultsTags"
      (selectTag)="onResultSelect($event);"
    ></tags-internal-auto-complete-results>
    <button (click)="focusInputFieldEmitter.emit()">Click me</button>
  `,
  styles: [
    `tags-internal-auto-complete-results.hidden {
      display: none;
    }`,
  ],
})
export class TagsAutoCompleteContainerComponent implements OnInit {
  @Input()
  get selectedTags() {
    return this.selectedTagsValue;
  }
  set selectedTags(nValue) {
    this.selectedTagsValue = nValue;
    this.selectedTagsChange.emit(this.selectedTagsValue);
  }

  @Output() selectedTagsChange = new EventEmitter<Tag[]>();

  inputChanged = new Subject<string>();

  selectedTagsValue: Tag[] = [];
  queryResultsTags: Tag[] = [];
  clearInputValueEmitter = new EventEmitter();
  focusInputFieldEmitter = new EventEmitter();

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
      .switchMap(query => this.tagsService.getTagsList({ query }))
      .do(() => this.changeDetectorRef.markForCheck())
      .do(tags => console.log(tags))
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
    this.selectedTags = [...this.selectedTags, tag];
    this.clearInputValueEmitter.emit();
    this.queryResultsTags = [];
    this.focusInputFieldEmitter.emit();
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
