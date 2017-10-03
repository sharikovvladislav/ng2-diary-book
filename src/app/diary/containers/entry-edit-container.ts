import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { DiaryEntry } from '../../shared/models/diary-entry';

import * as fromRoot from '../reducers';
import * as diaryActions from '../actions/diary-entries';

@Component({
  selector: 'diary-entry-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <diary-entry-form
      [entry]="entry"
      [options]="entryDetailComponentOptions"
      (submit)="onSubmit($event)"
    ></diary-entry-form>
  `,
})
export class EntryEditContainerComponent {
  @Input() entry: DiaryEntry;
  entryDetailComponentOptions: object;

  constructor(private store: Store<fromRoot.State>) {
    this.entryDetailComponentOptions = {
      buttonLabel: 'Edit',
    };
  }

  onSubmit(entryToEdit: DiaryEntry) {
    this.store.dispatch(new diaryActions.EditEntryAction(entryToEdit));
  }
}
