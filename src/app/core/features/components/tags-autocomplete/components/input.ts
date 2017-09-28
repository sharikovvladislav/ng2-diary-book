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
        <input />
      </div>
    </div>
  `,
})
export class TagsAutoCompleteInputComponent {
  @Input() selectedTags: Tag[] = [];

  @Output() deleteTag = new EventEmitter<Tag>();
}
