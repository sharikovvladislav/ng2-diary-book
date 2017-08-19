import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Friend } from '../../shared/models/friend';

@Component({
  selector: 'friends-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="friends.length === 0">
      List is empty
    </div>
    <div *ngIf="friends.length > 0">
      <div *ngFor="let friend of friends">
        <span>Name:&nbsp;</span><span>{{friend.displayName}}</span>
        <span>E-mail:&nbsp;</span><span>{{friend.email}}</span>
        <div *ngIf="isPendingMode">
          <button md-button (click)="accept.emit(friend.email)">Accept</button>
        </div>
        <div *ngIf="isGoToDiaries">
          <button md-button (click)="goToDiary.emit(friend)">Go to diary</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `friends-list-item {
      padding: 20px;
    }`,
  ],
})
export class FriendsListComponent {
  @Input() friends: Friend[];

  @Input() isPendingMode: Boolean = false;
  @Output() accept = new EventEmitter<string>();

  @Input() isGoToDiaries: Boolean = false;
  @Output() goToDiary = new EventEmitter<number>();

  constructor() {}
}
