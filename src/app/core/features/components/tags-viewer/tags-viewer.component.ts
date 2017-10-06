import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'tags-viewer',
  template: `
    <span *ngFor="let tag of tags" class="tag">
      <span (click)="tagClick.emit(tag);">{{tag.name}}</span>
    </span>
  `,
  styleUrls: ['../styles/tags-common.styles.css'],
})
export class TagsViewerComponent {
  @Input() tags: Tag[] = [];

  @Output() tagClick = new EventEmitter();
}
