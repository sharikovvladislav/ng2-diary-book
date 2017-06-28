import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>{{ entry.date | date:'MMM d' }}</md-card-title>
      <md-card-content><div [innerHTML]="entry.message | diaryMarkdown"></div></md-card-content>
      <md-card-footer>
        Create date: {{ entry.createDate | date }}
        <span (click)="onClick.emit(entry)">Edit</span>
      </md-card-footer>
    </md-card>
  `
})
export class EntryListItemComponent {
  @Input() entry: DiaryEntry;
  @Output() onClick = new EventEmitter();
}
