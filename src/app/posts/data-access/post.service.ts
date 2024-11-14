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

// TODO: Implement error handling.
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getLatestPosts(): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(`${env.apiBaseUrl}/posts/latest/`);
  }

  public getPosts({ url, page = 1 }: CommonParams): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(
      url ? url : `${env.apiBaseUrl}/posts/?page=${page}`
    );
  }

  public getTags({ url, page = 1 }: CommonParams): Observable<Page<Tag>> {
    return this.http.get<Page<Tag>>(
      url ? url : `${env.apiBaseUrl}/tags/?page=${page}`
    );
  }
}
