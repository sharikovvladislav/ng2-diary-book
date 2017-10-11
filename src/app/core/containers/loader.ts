import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-loader',
  template: `
    <div>
      <div class="full-page"
           [class.has-opacity]="showLoader"
           [class.filled-background]="showLoader"
      >
        <div class="spinner" [class.hidden]="!showLoader">
          <div class="full-page aligner">
            <div class="aligner-item">
              <md-progress-spinner mode="indeterminate"></md-progress-spinner>
            </div>
          </div>
        </div>
        <ng-content></ng-content>
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
    `,
    `
      .hidden {
        display: none;
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  showLoader$: Observable<Boolean>;
  showLoader: Boolean = true;

  ngOnInit() {
    this.showLoader$.subscribe(isLoading => (this.showLoader = isLoading));
  }

  constructor(store: Store<fromRoot.State>) {
    this.showLoader$ = store.select(fromRoot.getIsSpinnerShown);
  }
}
