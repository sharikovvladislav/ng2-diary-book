import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DiaryEntry } from 'ng2-diary-book-shared-models';
import { DiaryEntrySet } from 'ng2-diary-book-shared-models';

import { HttpClient } from '@angular/common/http';
import { RemoteList } from '../models/remote-list';
import { environment } from '../../../environments/environment';
import { Tag } from 'ng2-diary-book-shared-models';

@Injectable()
export class DiaryEntryService {
  private API_REST_URL = environment.firebase.restURL;

  constructor(private http: HttpClient) {}

  retrieveEntries(tagsNames?: string[]): Observable<any> {
    let url = `${this.API_REST_URL}diaryEntries`;

    if (tagsNames) {
      url += '?' + this.generateQueryPartialFromArray('tagNames', tagsNames);
    }

    return this.http
      .get(url)
      .map((diaryEntries: RemoteList) => diaryEntries.items);
  }

  getEntry(entryKey: string): Observable<DiaryEntry> {
    return this.retrieveEntries().switchMap((entries: DiaryEntry[]) => {
      return Observable.of(entries.filter(entry => entry.$key === entryKey)[0]);
    });
  }

  updateEntry(entryData: DiaryEntry): Observable<any> {
    const entryKey = entryData.$key;
    const dataToSend: any = {};

    dataToSend.tagIds = entryData.tags.map((tag: Tag) => tag.$key);
    dataToSend.message = entryData.message;
    dataToSend.date = entryData.date;

    return this.http.put(
      `${this.API_REST_URL}diaryEntries/${entryKey}`,
      dataToSend,
    );
  }

  createEntry(entryData: DiaryEntrySet): Observable<any> {
    const dataToSend: any = {};

    dataToSend.date = entryData.date;
    dataToSend.message = entryData.message;
    dataToSend.tagIds = entryData.tags.map(tag => tag.$key);

    delete dataToSend.$key;

    return this.http.post(`${this.getPrefix()}`, dataToSend);
  }

  getPrefix(): string {
    return `${this.API_REST_URL}diaryEntries`;
  }

  generateQueryPartialFromArray(parameterName: string, array: string[]) {
    return array.map(item => `${parameterName}=${item}`).join('&');
  }
}
