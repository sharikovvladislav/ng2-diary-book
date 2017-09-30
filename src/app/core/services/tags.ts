import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { Tag } from '../../shared/models/tag';

@Injectable()
export class TagsService {
  // private API_TAGS_GETTER_PATH = 'tags';
  // private API_REST_URL = environment.firebase.restURL;

  private API_TAGS_GETTER_PATH = '/tags';
  private API_REST_URL = 'api';

  getTagsList(tagsRequestFilter?: TagsRequestFilter): Observable<any> {
    return this.http
      .get<Tag[]>(`${this.API_REST_URL}${this.API_TAGS_GETTER_PATH}`)
      .switchMap((response: any) => {
        console.log('switchMap');
        const tags = response.data;
        const filteredTags = tags.filter((tag: Tag) =>
          tag.name.includes(tagsRequestFilter.query),
        );

        return Observable.of(filteredTags);
      });
  }

  constructor(private http: HttpClient) {}
}
