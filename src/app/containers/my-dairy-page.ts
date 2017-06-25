import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as diaryEntries from '../actions/diary-entries';

import {DiaryEntry} from '../models/diary-entry';

import {MdDialog, MdDialogRef} from '@angular/material';

import {EntryCreateDialogComponent} from './create-entry-dialog';

@Component({
  selector: 'diary-page',
  template: `
    <common-show-if-logged-in>
      <div>
        <button md-button (click)="openDialog()">+ Добавить запись</button>
      </div>
      <!--
      <div>
        <diary-entry-create></diary-entry-create>
      </div>
      -->
      <div>
        <diary-entry-list [entries]="diaryEntries$ | async"></diary-entry-list>
      </div>
    </common-show-if-logged-in>
  `
})
export class MyDairyPageComponent {
  selectedOption: any;
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(private store: Store<fromRoot.State>, public dialog: MdDialog) {
    this.diaryEntries$ = store.select(fromRoot.getEntries);
    store.select(fromRoot.getIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.store.dispatch(new diaryEntries.LoadListAction());
        }
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EntryCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
    // this.store.dispatch(new diaryDialogs.OpenCreateDialogAction());
  }
}
