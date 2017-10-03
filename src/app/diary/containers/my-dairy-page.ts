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

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'diary-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <diary-entries-list
        [entries]="diaryEntries$ | async"
        (onClick)="goToEdit($event)"
      ></diary-entries-list>
      <button md-mini-fab class="example-fab" (click)="goToAdd()">
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
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.diaryEntries$ = store.select(fromDiary.getDiaryEntries);
    this.diaryEntries$.subscribe(data => console.log(data));
    store.select(fromRoot.getUserIsLoggedIn).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.store.dispatch(new diaryEntries.LoadListAction());
        changeDetectorRef.markForCheck();
      }
    });
  }

  goToAdd() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  goToEdit(entryToEdit: DiaryEntry) {
    this.router.navigate(['./edit', entryToEdit.$key], {
      relativeTo: this.route,
    });
  }
}
