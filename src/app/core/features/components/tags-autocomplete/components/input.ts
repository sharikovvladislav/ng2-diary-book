import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

@Component({
  selector: 'tags-internal-auto-complete-input',
  template: `
    <div>
      <div>
        selectedTags:
        <span *ngFor="let tag of selectedTags" (click)="deleteTag.emit(tag);">
          {{tag.name}}
        </span>
        <span *ngIf="selectedTags.length === 0">No tags</span>
      </div>
      <div>
        <input #input [(ngModel)]="inputValue" (keyup)="inputChanged.emit(input.value)"/>
      </div>
    </div>
  `,
})
export class TagsAutoCompleteInputComponent {
  @Input() selectedTags: Tag[] = [];

  inputValue = '';

  @Output() deleteTag = new EventEmitter<Tag>();
  @Output() inputChanged = new EventEmitter<string>();
}
