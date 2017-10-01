import { Component, EventEmitter } from '@angular/core';
import { Tag } from '../../shared/models/tag';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromTags from '../reducers';
import * as fromRoot from '../../reducers';

import * as tagsActions from '../actions/tags';
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
        <md-list-item *ngFor="let tag of tags$ | async">{{tag.name}}</md-list-item>
      </md-list>
    </md-card>
  `,
  styles: [
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
}
