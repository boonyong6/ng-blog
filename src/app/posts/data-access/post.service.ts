import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../../shared/data-access/types';
import { Observable } from 'rxjs';
import { Post } from './post';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getLatestPosts(): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(`${environment.apiBaseUrl}/posts/latest/`);
  }
}
