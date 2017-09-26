import { Component } from '@angular/core';
import { Tag } from '../../shared/models/tag';
import { Observable } from 'rxjs/Observable';

@Component({
  template: `
    <md-card>
      <div *ngIf="(tags$ | async).length === 0">
        You don't have any tags. <button md-button (click)="addTag();">Add first</button>.
      </div>
      <div *ngIf="(tags$ | async).length > 0">
        <button md-button (click)="addTag();">Add tag</button>
        Yay you have tags!
        <md-row *ngFor="let tag of tags$ | async">
          <span>{{tag.name}}</span>
        </md-row>
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

  addTag() {
    console.log('kek');
  }
}
