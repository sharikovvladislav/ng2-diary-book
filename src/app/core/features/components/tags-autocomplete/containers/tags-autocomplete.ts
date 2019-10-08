import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Tag } from 'ng2-diary-book-shared-models';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { TagsService } from '../../../../services/tags';
import { TagsAutoCompleteInputComponent } from '../components/input';

@Component({
  selector: 'tags-auto-complete',
  template: `
    <tags-internal-auto-complete-input
      #tagsInput
      [selectedTags]="selectedTagsValue"
      [placeholder]="placeholder"
      [showLoader]="isLoading"
      (inputChanged)="onInputChange($event);"
      (deleteTag)="onDeleteSelected($event);"
    ></tags-internal-auto-complete-input>
    <tags-internal-auto-complete-results
      [class.hidden]="queryResultsTags.length === 0"
      [data]="queryResultsTags"
      (selectTag)="onResultSelect($event);"
    ></tags-internal-auto-complete-results>
  `,
  styles: [
    `tags-internal-auto-complete-results.hidden {
      display: none;
    }`,
  ],
})
export class TagsAutoCompleteContainerComponent implements OnInit {
  @ViewChild('tagsInput') tagsInput: TagsAutoCompleteInputComponent;

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
  isLoading = false;
  selectedTagsValue: Tag[] = [];
  queryResultsTags: Tag[] = [];
  placeholder = 'Введите теги...';

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
      .do(() => {
        this.isLoading = true;
        this.changeDetectorRef.markForCheck();
      })
      .switchMap(query => this.tagsService.getTagsList({ query }))
      .do(() => {
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      })
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
    this.selectedTags = [...this.selectedTags, tag];
    this.tagsInput.clearInput();
    this.queryResultsTags = [];
    this.tagsInput.focusInput();
  }

  onDeleteSelected(tagToDelete: Tag): void {
    this.selectedTags = this.selectedTags.filter(
      tag => tag.name !== tagToDelete.name,
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
