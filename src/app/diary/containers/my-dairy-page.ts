import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromDiary from '../reducers';

import * as diaryEntries from '../actions/diary-entries';

import { DiaryEntry } from '../../shared/models/diary-entry';

import { DialogFactoryService } from '../services/dialog-factory';

@Component({
  selector: 'diary-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <!--<button md-button (click)="openCreateDialog()">+ Добавить запись</button>-->
      <diary-entry-list
        [entries]="diaryEntries$ | async"
        (onClick)="openEditDialog($event)"
      ></diary-entry-list>
      <button md-mini-fab class="example-fab" (click)="openCreateDialog()">
        <md-icon>add</md-icon>
      </button>
    </common-show-if-logged-in>
  `,
  styles: [
    `diary-page {
      position: absolute;
      width: 100%;
      height: 100%;
    }`,
    `.example-fab {
      position: fixed;
      right: 20px;
      bottom: 10px;
    }`,
  ],
})
export class MyDairyPageComponent {
  diaryEntries$: Observable<DiaryEntry[]>;

  constructor(
    private store: Store<fromDiary.State>,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogFactory: DialogFactoryService
  ) {
    this.diaryEntries$ = store.select(fromDiary.getDiaryEntries);
    store.select(fromRoot.getUserIsLoggedIn).subscribe(isLoggedIn => {
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
