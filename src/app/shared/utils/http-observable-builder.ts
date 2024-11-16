import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

export class HttpObservableBuilder<Type> {
  constructor(private observable: Observable<Type>) {}

  public handle404NotFound(callback: () => void): HttpObservableBuilder<Type> {
    this.observable = this.observable.pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.NotFound) {
          callback();
        }
        return of();
      })
    );

    return this;
  }

  public getResult(): Observable<Type> {
    return this.observable;
  }
}
