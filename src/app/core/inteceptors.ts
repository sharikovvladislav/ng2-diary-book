import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.State>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(fromRoot.getUserToken)
      .take(1)
      .mergeMap(token =>
        next.handle(req.clone({setHeaders: {Authorization: `Bearer ${token}`}}))
      );
  }
}
