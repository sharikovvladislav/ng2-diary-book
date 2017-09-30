import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../../../shared/models/tag';

@Component({
  selector: 'tags-internal-auto-complete-results',
  template: `
    <div class="container">
      <span *ngFor="let tag of data" (click)="selectTag.emit(tag);" class="tag">
        {{tag.name}}
      </span>
    </div>
  `,
  styleUrls: ['./results.styles.css'],
})
export class TagsAutoCompleteResultsComponent {
  @Input() data: Tag[] = [];

  @Output() selectTag = new EventEmitter<Tag>();
}
