import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../../shared/data-access/types';
import { Comment } from './types';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments({ url, page = 1, postId }: ListParams = {}): Observable<
    Page<Comment>
  > {
    let endpoint = `${env.apiBaseUrl}/comments/?page=${page}`;

    if (postId) {
      endpoint += `&post_id=${postId}`;
    }

    return this.http.get<Page<Comment>>(url ? url : endpoint);
  }

  createComment({ name, body, postId }: CreationParams): Observable<Comment> {
    const requestBody: CreationRequestBody = {
      postId,
      name: name,
      body,
      active: true,
    };
    return this.http.post<Comment>(`${env.apiBaseUrl}/comments/`, requestBody);
  }
}

type ListParams = {
  url?: string;
  page?: number;
  postId?: number;
};

type CreationParams = {
  name?: string;
  body: string;
  postId: number;
};

type CreationRequestBody = {
  postId: number;
  name?: string;
  body: string;
  active: boolean;
};
