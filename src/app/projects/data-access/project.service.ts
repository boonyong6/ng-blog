import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../shared/data-access/types';
import { Project } from './types';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects({ url, page = 1 }: ListParams = {}): Observable<Page<Project>> {
    return this.http.get<Page<Project>>(
      url ? url : `${env.apiBaseUrl}/projects/?page=${page}`,
    );
  }
}

type ListParams = {
  url?: string;
  page?: number;
};
