import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Breadcrumb } from '../models/breadcrumb';
import { Observable } from 'rxjs/Observable';

import { BreadcrumbsService } from '../services/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <app-breadcrumbs-component [breadcrumbs]="breadcrumbs"></app-breadcrumbs-component>
  `,
})
export class BreadcrumbsContainer implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
  ) {}

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.breadcrumbs = this.breadcrumbsService
          .getBreadcrumbs(this.activatedRoute.snapshot)
          .map(breadcrumb => ({ path: breadcrumb }));
      });
  }
}
