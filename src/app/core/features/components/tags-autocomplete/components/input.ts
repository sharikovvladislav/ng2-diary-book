import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Tag } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'tags-internal-auto-complete-input',
  template: `
    <div class="container">
      <div class="selectedTags">
        <span *ngFor="let tag of selectedTags" class="tag">
          {{tag.name}}&nbsp;<span (click)="deleteTag.emit(tag);">X</span>
        </span>
      </div>
      <div class="input">
        <input #input
               placeholder="{{placeholder}}"
               (keydown.backspace)="onBackspacePressed(input.value)"
               [(ngModel)]="inputValue"
               (ngModelChange)="inputChanged.emit(input.value);"
        />
      </div>
    </div>
  `,
  styleUrls: ['./input.styles.css'],
})
export class TagsAutoCompleteInputComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;

  @Input() selectedTags: Tag[] = [];
  @Input() placeholder = '';
  @Input() clearInputValue: EventEmitter<any>;
  @Input() focusInputField: EventEmitter<any>;

  inputValue = '';

  @Output() deleteTag = new EventEmitter<Tag>();
  @Output() inputChanged = new EventEmitter<string>();

  onBackspacePressed({ length: inputValueLength }) {
    if (inputValueLength === 0) {
      this.deleteTag.emit(this.selectedTags[this.selectedTags.length - 1]);
    }
  }

  ngOnInit() {
    this.clearInputValue.subscribe(() => (this.inputValue = ''));
    this.focusInputField.subscribe(() => this.inputRef.nativeElement.focus());
  }
}
