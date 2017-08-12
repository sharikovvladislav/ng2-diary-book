import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { DiaryEntry } from '../models/diary-entry';

@Component({
  selector: 'diary-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>{{ entry.date | date:'MMM d' }}</md-card-title>
      <md-card-content>
        <div [innerHTML]="entry.message | diaryMarkdown"></div>

        <div class="content-footer">
        Create date: {{ entry.createDate | date }}
        <span *ngIf="!isEditDisabled" (click)="onClick.emit(entry)">Edit</span>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: [
    `md-card {
      margin: 0 auto;
      width: 60%;
    }`,
    `.content-footer {
      padding-top: 20px;
    }`
  ]
})
export class EntryListItemComponent {
  @Input() entry: DiaryEntry;
  @Input() isEditDisabled = false;
  @Output() onClick = new EventEmitter();
}
