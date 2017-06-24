import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

import * as fromRoot from '../reducers';
import * as diaryActions from '../actions/diary-entries';

@Component({
  selector: 'diary-entry-create',
  template: `
    <diary-entry-detail
      [entry]="entryToCreate"
      [options]="entryDetailComponentOptions"
      (submit)="onCreate($event)"
    ></diary-entry-detail>
  `
})
export class EntryCreateContainerComponent {
  entryToCreate;
  entryDetailComponentOptions: object;

  constructor(private store: Store<fromRoot.State>) {
    this.entryDetailComponentOptions = {
      buttonLabel: 'Create'
    };
    this.entryToCreate = {
      date: new Date(),
      message: ''
    };
  }

  onCreate($event) {
    const entryDate = moment(this.entryToCreate.date).toISOString();

    this.store.dispatch(new diaryActions.CreateEntryAction({
      ...this.entryToCreate,
      date: entryDate,
      createDate: moment().toISOString()
    }));
  }
}
