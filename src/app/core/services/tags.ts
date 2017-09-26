import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';

const TAGS_MOCK = [
  { id: 1, name: 'здоровье', description: '' },
  { id: 2, name: 'хобби', description: '' },
  { id: 3, name: 'angular', description: '' },
  { id: 4, name: 'работа', description: '' },
  { id: 5, name: '52недели', description: '' },
  { id: 6, name: 'спина', description: '' },
  { id: 7, name: 'секс', description: '' },
];

@Injectable()
export class TagsService {
  private API_TAGS_GETTER_PATH = 'tags';
  private API_REST_URL = environment.firebase.restURL;

  getTagsList(query?: string): Observable<any> {
    return of(
      query ? TAGS_MOCK.filter(tag => tag.name.includes(query)) : TAGS_MOCK,
    );

    // return this.http.get(
    //   `${this.API_REST_URL}${this.API_TAGS_GETTER_PATH}/some/path/to/get/tags`,
    // );
  }

  constructor(private http: HttpClient) {}
}
