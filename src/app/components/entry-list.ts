import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-entry-list',
  template: `
    <div>
      <div *ngFor="let entry of entries">
        <diary-list-item 
          [entry]="entry"
          (onClick)="onClick.emit($event)"
        ></diary-list-item>
      </div>
    </div>
  `
})

export class EntryListComponent {
  @Input() entries: DiaryEntry[];
  @Output() onClick = new EventEmitter();

  constructor() {
  }
}
