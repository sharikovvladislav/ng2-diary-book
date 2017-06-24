import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'common-date-picker',
  template: `
    <md-input-container>
      <input mdInput [value]="dateValue" [mdDatepicker]="picker" placeholder="Choose a date">
      <button mdSuffix [mdDatepickerToggle]="picker"></button>
    </md-input-container>
    <md-datepicker (selectedChanged)="onSelectedChanged($event)"  #picker></md-datepicker>
  `
})
export class CommonDatePickerComponent {
  dateValue: any;
  @Output() dateChange = new EventEmitter();

  @Input()
  get date() {
    return this.dateValue;
  }

  set date(val) {
    this.dateValue = val;
    this.dateChange.emit(this.dateValue);
  }

  onSelectedChanged(newDate) {
    this.date = newDate;
  }
}
