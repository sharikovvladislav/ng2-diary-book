import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

@Component({
  selector: 'tags-internal-auto-complete-input',
  template: `
      <div class="selectedTags">
        <span *ngFor="let tag of selectedTags" class="tag">
          {{tag.name}}&nbsp;<span (click)="deleteTag.emit(tag);">X</span>
        </span>
      </div>
      <div class="input">
        <input #input [(ngModel)]="inputValue" (ngModelChange)="inputChanged.emit(input.value);"/>
      </div>
  `,
  styles: [
    `
      .tag {
        display: inline-block;
        padding: 3px 5px;
        background-color: #cee0ed;
        color: #33658a;
      }
    `,
    `
      .tag:not(:first-child) {
        margin-left: 3px;
      }
    `,
    `
      .selectedTags {
        display: inline-block;
      }
    `,
    `
      .input {
        display: inline-block;
      }
    `,
  ],
})
export class TagsAutoCompleteInputComponent implements OnInit {
  @Input() selectedTags: Tag[] = [];
  @Input() clearInputValue: EventEmitter<any>;

  inputValue = '';

  @Output() deleteTag = new EventEmitter<Tag>();
  @Output() inputChanged = new EventEmitter<string>();

  ngOnInit() {
    this.clearInputValue.subscribe(() => (this.inputValue = ''));
  }
}
