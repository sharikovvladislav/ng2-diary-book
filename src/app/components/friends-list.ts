import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { Friend } from '../models/friend';

@Component({
  selector: 'friends-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let friend of friends">
      <span>Name:&nbsp;</span><span>{{friend.name}}</span>
      <span>E-mail:&nbsp;</span><span>{{friend.email}}</span>
      <div *ngIf="isPendingMode">
        <button md-button (click)="accept.emit(friend)">Accept</button>
      </div>
    </div>
  `,
  styles: [
    `friends-list-item {
      padding: 20px;
    }`
  ]
})

export class FriendsListComponent {
  @Input() friends: Friend[];
  @Input() isPendingMode: Boolean = false;
  @Output() accept = new EventEmitter<Friend>();

  constructor() {
  }
}
