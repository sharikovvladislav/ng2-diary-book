import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'diary-entry-detail',
  template: `
    <label>Запись: </label><textarea [(ngModel)]="entry.message"></textarea>
    <label>Дата:</label>
    <common-date-picker [(date)]="entry.date"></common-date-picker>
    <button (click)="submit.emit(entry)">{{options.buttonLabel}}</button>
  `
})
export class EntryDetailComponent {
  @Input() entry: any;
  @Input() options: any;
  @Output() submit = new EventEmitter<string>();
}
