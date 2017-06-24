import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/Observable/from';
import {Book} from '../models/book';
import * as X from '../reducers/user';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {DiaryEntry} from '../models/diary-entry';
import {DiaryEntrySet} from '../models/diary-entry-set';


@Injectable()
export class DiaryEntryService {
  private API_PATH = '/diaryEntries';
  private list$: FirebaseListObservable<{}>;

  constructor(private db: AngularFireDatabase) {
    this.list$ = this.db.list(this.API_PATH);
  }

  retrieveEntries(uid: string): Observable<DiaryEntry[]> {
    return this.getDbRef(uid)
      .map((res) => res || [])
      .take(1);
  }

  createEntry(uid: string, entryData: DiaryEntrySet): Observable<DiaryEntry> {
    return new Observable(observer => {
      this.getDbRef(uid)
        .push(entryData)
        .then(() => {
          observer.next(entryData);
          observer.complete();
        });
    });
  }

  private getDbRef(uid: string) {
    return this.db.list(`/${uid}${this.API_PATH}`);
  }
}