import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-component',
  template: `
    <div>
      <md-card>
      <span>{{ getBreadcrumbsAsString() }}</span>
      </md-card>
    </div>
  `,
  styles: [
    `md-card {
      padding: 10px;
    }`,
  ],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: [{ path: string }];

  getBreadcrumbsAsString(): string {
    return this.breadcrumbs.reduce(
      (acc, { path }) => (acc ? `${acc} > ${path}` : path),
      '',
    );
  }
}
