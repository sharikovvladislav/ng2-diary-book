import { Component } from '@angular/core';

@Component({
  selector: 'friends-add',
  template: `
    <div>
      <md-input-container>
        <input mdInput [(ngModel)]="email"/>
      </md-input-container>
      <button md-button (click)="onAddClick();">Add friend</button>
    </div>
  `
})
export class AddFriendComponent {
  email: string;

  constructor() {
    this.email = '';
  }

  onAddClick() {
  }
}
