import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as fromRouter from '../actions/router';
import * as fromRoot from '../../reducers';

@Injectable()
export class RouterHelperService {
  goToDiary(tagNames?: string[]) {
    this.store.dispatch(
      new fromRouter.Go({
        path: [`/diary`, { tagNames: tagNames }],
        extras: {
          relativeTo: this.route,
        },
      }),
    );
  }

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
  ) {}
}
