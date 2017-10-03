import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Tag } from 'ng2-diary-book-shared-models';
import { TagsRequestFilter } from 'ng2-diary-book-shared-models';

@Injectable()
export class TagsService {
  private API_TAGS_GETTER_PATH = 'my-tags';
  private API_REST_URL = environment.firebase.restURL;

  getTagsPrefix() {
    return `${this.API_REST_URL}${this.API_TAGS_GETTER_PATH}`;
  }

  addTag(tagName: string): any {
    return this.http.post(`${this.getTagsPrefix()}`, { name: tagName });
  }

  editTag(key: string, tag: Tag): any {
    return this.http.post(`${this.getTagsPrefix()}/${key}`, tag);
  }

  deleteTag(key: string): any {
    return this.http.delete(`${this.getTagsPrefix()}/${key}`);
  }

  getTagsList(tagsRequestFilter?: TagsRequestFilter): Observable<any> {
    return this.http
      .get<Tag[]>(
        `${this.getTagsPrefix()}${tagsRequestFilter && tagsRequestFilter.query
          ? `?query=` + tagsRequestFilter.query
          : ''}`,
      )
      .map((tagsResponse: any) => tagsResponse.items);
  }

  constructor(private http: HttpClient) {}
}
