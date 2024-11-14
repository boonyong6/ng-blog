import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page, Tag } from '../../shared/data-access/types';
import { Observable } from 'rxjs';
import { Post } from './post';
import { environment as env } from '../../../environments/environment';

type CommonParams = {
  url?: string;
  page?: number;
};

type GetPostsParams = CommonParams & {
  tagSlug?: string;
};

// TODO: Implement error handling.
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getLatestPosts(): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(`${env.apiBaseUrl}/posts/latest/`);
  }

  public getPosts({
    url,
    page = 1,
    tagSlug,
  }: GetPostsParams): Observable<Page<Post>> {
    let endpoint = `${env.apiBaseUrl}/posts/?page=${page}`;

    if (tagSlug) {
      endpoint = `${env.apiBaseUrl}/tags/${tagSlug}/posts/?page=${page}`;
    }

    return this.http.get<Page<Post>>(url ? url : endpoint);
  }

  public getTags({ url, page = 1 }: CommonParams): Observable<Page<Tag>> {
    return this.http.get<Page<Tag>>(
      url ? url : `${env.apiBaseUrl}/tags/?page=${page}`
    );
  }
}
