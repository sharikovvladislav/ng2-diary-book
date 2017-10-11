import { Component, EventEmitter } from '@angular/core';
import { Tag } from 'ng2-diary-book-shared-models';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromTags from '../reducers';
import * as fromRoot from '../../reducers';

import * as tagsActions from '../actions/tags';
import { Actions } from '@ngrx/effects';

import 'rxjs/add/operator/take';
import { RouterHelperService } from '../../core/services/router';

@Component({
  template: `
    <common-show-if-logged-in>
      <md-card>
        <md-list>
          <md-list-item>
            <tags-creator
              [clearValue]="clearFieldEmitter"
              (onEnterPressed)="onCreateTagCommand($event)"
            ></tags-creator>
          </md-list-item>
          <md-list-item *ngFor="let tag of tags$ | async">
            {{tag.name}}
            <md-icon (click)="onClick(tag);">comment</md-icon>
          </md-list-item>
        </md-list>
      </md-card>
    </common-show-if-logged-in>
  `,
  styles: [
    `
      md-list-item:not(:first-child) {
        border-top: 1px dashed #dcdcdc;
      }
    `,
    `button {
      background-color: #4bccbc
    }`,
  ],
})
export class TagsManagerContainer {
  clearFieldEmitter = new EventEmitter();
  tags$: Observable<Tag[]> = Observable.of([]);

  constructor(
    private tagsStore: Store<fromTags.State>,
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private routerService: RouterHelperService,
  ) {
    this.tags$ = tagsStore.select(fromTags.getTags);

    store
      .select(fromRoot.getUserIsLoggedIn)
      .filter(isUserLoggedIn => isUserLoggedIn)
      .subscribe(() =>
        this.store.dispatch(new tagsActions.GetTagsListAction()),
      );
  }

  onCreateTagCommand(tagName) {
    this.store.dispatch(new tagsActions.CreateTag(tagName));
    this.actions$
      .ofType(tagsActions.CREATE_TAG_SUCCESS)
      .take(1)
      .subscribe(() => {
        this.clearFieldEmitter.emit();
        this.store.dispatch(new tagsActions.GetTagsListAction());
      });
  }

  onClick(tag: Tag) {
    this.routerService.goToDiary([tag.name]);
  }
}
