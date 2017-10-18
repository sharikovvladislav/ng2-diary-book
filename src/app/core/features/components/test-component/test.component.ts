import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  template: `
    <p>
      simple works!
    </p>

  `,
})
export class TestComponent {
  constructor(private route: ActivatedRoute) {}
}
