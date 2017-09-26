import { Component } from '@angular/core';
import { Tag } from '../../shared/models/tag';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tags-manager',
  template: `
    <md-card>
      <div *ngIf="(tags$ | async).length === 0">
        You don't have any tags. <button (click)="addTag();">Add first</button>.
      </div>
      <div *ngIf="(tags$ | async).length > 0">
        <button (click)="addTag();">Add tag</button>
        Yay you have tags!
        <md-row *ngFor="let tag of tags$ | async">
          <span>{{tag.name}}</span>
        </md-row>
      </div>
    </md-card>
  `,
})
export class TagsManagerContainer {
  tags$: Observable<Tag[]> = Observable.of([]);

  addTag() {
    console.log('kek');
  }
}
