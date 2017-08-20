import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
/// 123123123
import { DiaryEntry } from '../../shared/models/diary-entry';

@Component({
  selector: 'diary-entry-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div *ngFor="let entry of entries">
        <diary-list-item
          [entry]="entry"
          [isEditDisabled]="isEditDisabled"
          (onClick)="onClick.emit($event)"
        ></diary-list-item>
      </div>
    </div>
  `,
  styles: [
    `diary-list-item {
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
