import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private activeRequests = 0;
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  public startLoading() {
    this.activeRequests++;
    this.loading.next(true);
  }

  public stopLoading() {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.loading.next(false);
    }
  }
}
