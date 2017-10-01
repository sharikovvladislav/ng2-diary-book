import { Component } from '@angular/core';
import { Tag } from '../../shared/models/tag';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromTags from '../reducers';
import * as fromRoot from '../../reducers';

import * as tagsActions from '../actions/tags';

@Component({
  template: `
    <md-card>
      <div *ngIf="(tags$ | async).length === 0">
        You don't have any tags. <button md-button (click)="addTag();">Add first</button>.
      </div>
      <div *ngIf="(tags$ | async).length > 0">
        <button md-button (click)="addTag();">Add tag</button>
        Yay you have tags!
        <div>
          <div *ngFor="let tag of tags$ | async">
            <span>{{tag.name}}</span>
            <span>{{tag.description}}</span>
          </div>
        </div>
      </div>
    </md-card>
  `,
  styles: [
    `button {
      background-color: #4bccbc
    }`,
  ],
})
export class TagsManagerContainer {
  tags$: Observable<Tag[]> = Observable.of([]);

  constructor(
    private tagsStore: Store<fromTags.State>,
    private store: Store<fromRoot.State>,
  ) {
    this.tags$ = tagsStore.select(fromTags.getTags);

    store
      .select(fromRoot.getUserIsLoggedIn)
      .filter(isUserLoggedIn => isUserLoggedIn)
      .subscribe(() =>
        this.store.dispatch(new tagsActions.GetTagsListAction()),
      );
  }

  addTag() {
    console.log('kek');
  }
}
