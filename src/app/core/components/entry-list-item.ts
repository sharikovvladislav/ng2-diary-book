import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { DiaryEntry } from '../../shared/models/diary-entry';

@Component({
  selector: 'diary-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <div class="edit-button-container" *ngIf="!isEditDisabled">
        <md-icon title="Edit" (click)="onClick.emit(entry)">mode_edit</md-icon>
      </div>
      <div>
        <md-card-title>{{ entry.date | date:'MMM d' }}</md-card-title>
        <md-card-content>
          <div [innerHTML]="entry.message | diaryMarkdown"></div>

          <div class="content-footer">
            Create date: {{ entry.createDate | date }}
          </div>
        </md-card-content>
      </div>
    </md-card>
  `,
  styles: [
    `.edit-button-container {
      position: absolute;
      top: 15px;
      right: 15px;
    }`,
    `.edit-button-container md-icon {
      cursor: default;
      font-size:20px;
      height:20px;
      width: 20px;
    }`,
    `md-card {
      margin: 0 auto;
      width: 60%;
    }`,
    `.content-footer {
      font-size: 80%;
      padding-top: 20px;
      color: #909090;
    }`
  ]
})
export class EntryListItemComponent {
  @Input() entry: DiaryEntry;
  @Input() isEditDisabled = false;
  @Output() onClick = new EventEmitter();
}
