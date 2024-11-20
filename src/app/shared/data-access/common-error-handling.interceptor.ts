import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const commonErrorHandlingInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === HttpStatusCode.NotFound) {
        router.navigate(['not-found'], { replaceUrl: true });
      }

      // TODO: Handle no network connection error.

      return throwError(() => err);
    })
  );
};