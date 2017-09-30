import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      div {
        margin-top: 10px;
      }
    `,
  ],
})
export class TagsRootContainer {}
