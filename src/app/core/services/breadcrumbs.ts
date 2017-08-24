import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class BreadcrumbsService {
  getBreadcrumbs(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    accumulatedBreadcrumbs: string[] = [],
  ) {
    if (activatedRouteSnapshot.children.length === 0) {
      // TODO должно быть заменено на что-то более логичное
      const currentBreadcrumb = activatedRouteSnapshot.data.breadcrumb || '';
      return [...accumulatedBreadcrumbs, currentBreadcrumb];
    }

    const currentBreadcrumb = activatedRouteSnapshot.data.breadcrumb || '';

    return this.getBreadcrumbs(activatedRouteSnapshot.children[0], [
      ...accumulatedBreadcrumbs,
      ...(!!currentBreadcrumb ? [currentBreadcrumb] : []),
    ]);
  }
}
