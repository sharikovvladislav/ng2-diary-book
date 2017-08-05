import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as diaryEntries from '../actions/diary-entries';

import {DiaryEntry} from '../models/diary-entry';

import {MdDialog, MdDialogRef} from '@angular/material';

import { EntryCreateDialogComponent } from './create-entry-dialog';
import { EntryEditDialogComponent } from './edit-entry-dialog';
import { DialogFactoryService } from '../services/dialog-factory';

@Component({
  selector: 'diary-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <div>
        <button md-button (click)="openCreateDialog()">+ Добавить запись</button>
      </div>
      <!--
      <div>
        <diary-entry-create></diary-entry-create>
      </div>
      -->
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
  selectedOption: any;
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MdDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogFactory: DialogFactoryService,
  ) {
    this.diaryEntries$ = store.select(fromRoot.getEntries);
    store.select(fromRoot.getIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.store.dispatch(new diaryEntries.LoadListAction());
          changeDetectorRef.markForCheck();
        }
      });
  }

  openCreateDialog() {
    this.dialogFactory.openCreateEntryDialog();
    // this.store.dispatch(new diaryDialogs.OpenCreateDialogAction());
  }

  openEditDialog(entryToEdit: DiaryEntry) {
    this.dialogFactory.openEditEntryDialog(entryToEdit);
  }
}
