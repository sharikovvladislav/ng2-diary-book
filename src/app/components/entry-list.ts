import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-entry-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div *ngFor="let entry of entries">
        <diary-list-item 
          [entry]="entry"
          (onClick)="onClick.emit($event)"
        ></diary-list-item>
      </div>
    </div>
  `,
  styles: [
    `diary-list-item {
      padding: 20px;
    }`
  ]
})

export class EntryListComponent {
  @Input() entries: DiaryEntry[];
  @Output() onClick = new EventEmitter();

  constructor() {
  }
}
