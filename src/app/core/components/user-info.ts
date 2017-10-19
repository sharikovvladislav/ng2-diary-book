import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-info-component',
  template: `
    <div class="user-info">
      <div class="image" *ngIf="hasPhotoURL()">
        <img src="{{photoURL}}" />
      </div>
      <div class="name">
        <span>{{displayName}}</span>
      </div>
      <span class="exit-button">
        <md-icon (click)="onExit.emit();">exit_to_app</md-icon>
      </span>
    </div>
  `,
  styleUrls: ['./user-info.css'],
})
export class UserInfoComponent {
  @Input() displayName: string;
  @Input() photoURL: string;
  @Output() onExit = new EventEmitter();

  hasPhotoURL() {
    return this.photoURL !== '';
  }
}
