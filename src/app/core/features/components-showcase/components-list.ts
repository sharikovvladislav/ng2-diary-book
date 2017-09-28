import { Component } from '@angular/core';

@Component({
  template: `
    <md-card>
      <button md-button (click)="goToTagsAutoComplete()">Tags auto complete</button>
    </md-card>
  `,
})
export class ComponentsListComponent {
  goToTagsAutoComplete() {
    console.log('kek');
  }
}
