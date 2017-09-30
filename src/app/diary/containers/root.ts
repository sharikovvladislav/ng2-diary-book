import { Component } from '@angular/core';

@Component({
  template: `
    <div class="root">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: [`../../core/styles/general.styles.css`],
})
export class DiaryRootComponent {}
