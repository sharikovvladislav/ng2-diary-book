import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromDiary from '../reducers';

import * as diaryEntries from '../actions/diary-entries';

import {DiaryEntry} from '../../shared/models/diary-entry';

import { DialogFactoryService } from '../services/dialog-factory';

@Component({
  selector: 'diary-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <div>
        <button md-button (click)="openCreateDialog()">+ Добавить запись</button>
      </div>
      <div>
        <diary-entry-list
          [entries]="diaryEntries$ | async"
          (onClick)="openEditDialog($event)"
        ></diary-entry-list>
      </div>
    </common-show-if-logged-in>
  `
})
export class MyDairyPageComponent {
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(
    private store: Store<fromDiary.State>,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogFactory: DialogFactoryService,
  ) {
    this.diaryEntries$ = store.select(fromDiary.getDiaryEntries);
    store.select(fromRoot.getUserIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.store.dispatch(new diaryEntries.LoadListAction());
          changeDetectorRef.markForCheck();
        }
      });
  }

  openCreateDialog() {
    this.dialogFactory.openCreateEntryDialog();
  }

  openEditDialog(entryToEdit: DiaryEntry) {
    this.dialogFactory.openEditEntryDialog(entryToEdit);
  }
}
