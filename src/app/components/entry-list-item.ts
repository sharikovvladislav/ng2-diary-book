import { Component, Input } from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-list-item',
  template: `
    <md-card>
      <md-card-title>{{ entry.date | date:'MMM d' }}</md-card-title>
      <md-card-content>{{ entry.message }}</md-card-content>
      <md-card-footer>Create date: {{ entry.createDate | date }}</md-card-footer>
    </md-card>
  `
})
export class EntryListItemComponent {
  @Input() entry: DiaryEntry;
}