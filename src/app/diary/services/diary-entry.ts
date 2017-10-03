import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DiaryEntry } from '../../shared/models/diary-entry';
import { DiaryEntrySet } from '../../shared/models/diary-entry-set';

import { HttpClient } from '@angular/common/http';
import { RemoteList } from '../models/remote-list';
import { environment } from '../../../environments/environment';

@Injectable()
export class DiaryEntryService {
  private API_REST_URL = environment.firebase.restURL;

  constructor(private http: HttpClient) {}

  retrieveEntries(): Observable<DiaryEntry[]> {
    return this.http
      .get(`${this.API_REST_URL}diaryEntries`)
      .map((diaryEntries: RemoteList) => diaryEntries.items);
  }

  getEntry(entryKey: string): Observable<DiaryEntry> {
    return this.retrieveEntries().switchMap((entries: DiaryEntry[]) => {
      return Observable.of(entries.filter(entry => entry.$key === entryKey)[0]);
    });
  }

  updateEntry(entryData: DiaryEntry): Observable<any> {
    const entryKey = entryData.$key;
    const dataToSend = { ...entryData };

    // подготовим теги

    // приходится удалять ключ, чтобы firebase не умер
    delete dataToSend.$key;
    // удаляем дату создания
    delete dataToSend.createDate;

    // TODO probably should update only with diff there and model must know what to save by itself

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
}
