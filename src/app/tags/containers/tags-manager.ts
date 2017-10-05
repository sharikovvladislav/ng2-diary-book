import { Component, EventEmitter } from '@angular/core';
import { Tag } from 'ng2-diary-book-shared-models';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromTags from '../reducers';
import * as fromRoot from '../../reducers';

import * as tagsActions from '../actions/tags';
import * as routerActions from '../../core/actions/router';
import { Actions } from '@ngrx/effects';

import 'rxjs/add/operator/take';

@Component({
  template: `
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
    this.store.dispatch(
      new routerActions.Go({
        path: [
          `/diary`,
          {
            tagNames: [tag.name],
          },
        ],
      }),
    );
  }
}
