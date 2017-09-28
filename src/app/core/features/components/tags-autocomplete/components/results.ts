import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

@Component({
  selector: 'tags-internal-auto-complete-results',
  template: `
    <div>
      data:
      <span *ngFor="let tag of data" (click)="selectTag.emit(tag);">
        {{tag.name}}
      </span>
    </div>
  `,
})
export class TagsAutoCompleteResultsComponent {
  @Input() data: Tag[] = [];

  @Output() selectTag = new EventEmitter<Tag>();
}
