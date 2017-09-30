import { Component } from '@angular/core';

@Component({
  selector: 'friends-root',
  template: `
    <div class="root">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['../../core/styles/general.styles.css'],
})
export class FriendRootContainer {}
