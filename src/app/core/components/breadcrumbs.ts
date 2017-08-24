import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-component',
  template: `
    <div>
      <span>></span>
    </div>
  `,
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: [{ path: string }];
}
