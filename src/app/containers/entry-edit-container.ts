import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { DiaryEntry } from '../models/diary-entry';

import * as fromRoot from '../reducers';
import * as diaryActions from '../actions/diary-entries';

@Component({
  selector: 'diary-entry-edit',
  template: `
    <diary-entry-detail
      [entry]="entry"
      [options]="entryDetailComponentOptions"
      (submit)="onEdit($event)"
    ></diary-entry-detail>
  `
})
export class EntryEditContainerComponent {
  @Input() entry: DiaryEntry;
  entryDetailComponentOptions: object;

  constructor(private store: Store<fromRoot.State>) {
    this.entryDetailComponentOptions = {
      buttonLabel: 'Edit'
    };
  }

  onEdit(entryToEdit: DiaryEntry) {
    this.store.dispatch(new diaryActions.EditEntryAction(entryToEdit.$key, entryToEdit));
  }
}
