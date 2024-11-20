import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page, Tag } from '../../shared/data-access/types';
import { Observable } from 'rxjs';
import { Post } from './post';
import { environment as env } from '../../../environments/environment';

type ListParams = {
  url?: string;
  page?: number;
  tagSlug?: string;
};

type GetParams = {
  url?: string;
  year?: string;
  month?: string;
  day?: string;
  slug?: string;
};

type SearchParams = {
  url?: string;
  page?: number;
  query?: string;
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
  }: ListParams): Observable<Page<Post>> {
    let endpoint = `${env.apiBaseUrl}/posts/?page=${page}`;

    if (tagSlug) {
      endpoint = `${env.apiBaseUrl}/tags/${tagSlug}/posts/?page=${page}`;
    }

    return this.http.get<Page<Post>>(url ? url : endpoint);
  }

  public getPost({ url, year, month, day, slug }: GetParams): Observable<Post> {
    return this.http.get<Post>(
      url ? url : `${env.apiBaseUrl}/posts/${year}/${month}/${day}/${slug}/`,
    );
  }

  public getTags({ url, page = 1 }: ListParams): Observable<Page<Tag>> {
    return this.http.get<Page<Tag>>(
      url ? url : `${env.apiBaseUrl}/tags/?page=${page}`,
    );
  }

  public searchPosts({
    url,
    page = 1,
    query,
  }: SearchParams): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(
      url ? url : `${env.apiBaseUrl}/posts/search/?page=${page}&query=${query}`,
    );
  }
}