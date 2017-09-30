import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-examples-container',
  template: `
    <md-card>
      <button md-button (click)="goBack();">Назад</button>
      <hr>
      <ng-content></ng-content>
    </md-card>
  `,
})
export class ExampleComponentsContainer {
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
