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
        <div class="input">
          <input #input
                 placeholder="{{placeholder}}"
                 (keydown.backspace)="onBackspacePressed(input.value)"
                 [(ngModel)]="inputValue"
                 (ngModelChange)="inputChanged.emit(input.value);"
          />
          <tags-auto-complete-loader class="loader" [class.hidden]="!showLoader"></tags-auto-complete-loader>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./input.styles.css'],
})
export class TagsAutoCompleteInputComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;

  @Input() selectedTags: Tag[] = [];
  @Input() placeholder = '';
  @Input() showLoader = false;

  inputValue = '';

  @Output() deleteTag = new EventEmitter<Tag>();
  @Output() inputChanged = new EventEmitter<string>();

  clearInput(): void {
    this.inputValue = '';
  }

  focusInput(): void {
    this.inputRef.nativeElement.focus();
  }

  onBackspacePressed({ length: inputValueLength }) {
    if (inputValueLength === 0) {
      this.deleteTag.emit(this.selectedTags[this.selectedTags.length - 1]);
    }
  }

  ngOnInit() {}
}
