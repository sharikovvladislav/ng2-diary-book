import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class TagsService {
  private API_TAGS_GETTER_PATH = 'tags';
  private API_REST_URL = environment.firebase.restURL;

  getTagsList(query?: string): Observable<any> {
    return this.http.get(
      `${this.API_REST_URL}${this.API_TAGS_GETTER_PATH}/some/path/to/get/tags`,
    );
  }

  constructor(private http: HttpClient) {}
}
