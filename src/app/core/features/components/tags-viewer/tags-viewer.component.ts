import { Component, Input } from '@angular/core';
import { Tag } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'tags-viewer',
  template: `
    <span *ngFor="let tag of tags" class="tag">
      {{tag.name}}
    </span>
  `,
  styleUrls: ['../styles/tags-common.styles.css'],
})
export class TagsViewerComponent {
  @Input() tags: Tag[] = [];
}
