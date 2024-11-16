import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.startLoading();

  return next(req).pipe(finalize(() => loadingService.stopLoading()));
};
