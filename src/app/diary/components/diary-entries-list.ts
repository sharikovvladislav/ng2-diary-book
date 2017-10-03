import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DiaryEntry } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'diary-entries-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div *ngFor="let entry of entries">
        <diary-entries-list-item
          [entry]="entry"
          [isEditDisabled]="isEditDisabled"
          (onClick)="onClick.emit($event)"
        ></diary-entries-list-item>
      </div>
    </div>
  `,
  styles: [
    `diary-entries-list-item:not(:first-child) {
      padding: 20px;
    }`,
  ],
})
export class EntryListComponent {
  @Input() entries: DiaryEntry[];
  @Input() isEditDisabled = false;
  @Output() onClick = new EventEmitter();

  constructor() {}
}
