import { Component, Input } from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-entry-list',
  template: `
    <div>
      <div *ngFor="let entry of entries">
        <diary-list-item [entry]="entry"></diary-list-item>
      </div>
    </div>
  `
})

export class EntryListComponent {
  @Input() entries: DiaryEntry[];

  constructor() {
  }
}
