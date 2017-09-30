import { Component } from '@angular/core';

@Component({
  template: `
    <md-card>
      <h1>Add tag</h1>
      <app-tags-editor></app-tags-editor>
    </md-card>
  `,
})
export class TagsAddContainer {}
