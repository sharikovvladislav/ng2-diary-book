import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/Observable/from';
import { Book } from '../models/book';
import * as X from '../reducers/user';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class DiaryEntryService {
  private API_PATH = '/diaryEntries';
  private list$: FirebaseListObservable<{}>;

  constructor(private db: AngularFireDatabase) {
    this.list$ = this.db.list(this.API_PATH);
  }

  retrieveEntries(): Observable<object[]> {
    return this.list$
      .map(res => res || []);
  }

  createEntry(entryData: any): any {
    return new Observable(observer => {
      this.list$
        .push(entryData)
        .then(() => {
          observer.next(entryData);
          observer.complete();
        });
    });
  }
}
