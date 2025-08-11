import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Page } from '../../shared/data-access/types';
import { Comment } from './types';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

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
    return this.http.post<Comment>(`${env.apiBaseUrl}/comments/`, requestBody, {
      headers: {
        'X-CSRFToken': this.cookieService.get('csrftoken'),
      },
    });
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
