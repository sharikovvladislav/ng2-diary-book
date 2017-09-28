import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <md-card>
      <button md-button (click)="goToTagsAutoComplete()">Tags auto complete</button>
    </md-card>
  `,
})
export class ComponentsListComponent {
  goToTagsAutoComplete() {
    this.router.navigate(['tags-auto-complete'], { relativeTo: this.route });
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
