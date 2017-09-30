import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

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
        <input #input [(ngModel)]="inputValue" (ngModelChange)="inputChanged.emit(input.value);"/>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        border: 1px solid #9e9e9e;
        padding: 2px;
      }
    `,
    `
      .tag {
        display: inline-block;
        padding: 3px 5px;
        background-color: #cee0ed;
        color: #33658a;
      }
    `,
    `
      .tag:hover {
        background-color: #bed0dd;
      }
    `,
    `
      .tag:not(:first-child) {
        margin-left: 3px;
      }
    `,
    `
      .input input {
        margin: 4px 3px 0;
        height: 20px;
        border: 0;
      }
    `,
    `
      input:focus{
        outline: none;
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
