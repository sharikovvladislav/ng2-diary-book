import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';

@Component({
  selector: 'diary-loader',
  template: `
    <div *ngIf="showLoader">
      <div class="full-page has-opacity filled-background"></div>
  
      <div class="full-page aligner">
        <div class="aligner-item">
          <md-progress-spinner mode="indeterminate"></md-progress-spinner>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .full-page {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9999;
      }
    `,
    `
      .has-opacity {
        opacity: 0.5;
      }
    `,
    `
      .filled-background {
        background-color: #b0b0b0;
      }
    `,
    `
      .aligner {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
    `
      .aligner-item {
        max-width: 50%;
      }
    `
  ]
})
export class LoaderComponent implements OnInit {
  showLoader$: Observable<Boolean>;
  showLoader: Boolean = true;

  ngOnInit() {
    this.showLoader$
        .subscribe(isLoading => this.showLoader = isLoading);
  }

  constructor(store: Store<fromRoot.State>) {
    this.showLoader$ = store.select(fromRoot.getIsSpinnerShown);
  }
}
