import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { catchError, firstValueFrom, of } from 'rxjs';
import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from './loading.service';

describe('loadingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => loadingInterceptor(req, next));
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    const _loadingServiceSpy = jasmine.createSpyObj<LoadingService>([
      'startLoading',
      'stopLoading',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: LoadingService, useValue: _loadingServiceSpy } as Provider,
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    loadingServiceSpy = TestBed.inject(
      LoadingService,
    ) as jasmine.SpyObj<LoadingService>;
    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should set loading state based on request progress', () => {
    const url = 'https://example.com/';

    firstValueFrom(http.get(url).pipe(catchError(() => of('Handle error...'))));

    const req = httpTesting.expectOne(url);
    expect(loadingServiceSpy.startLoading).toHaveBeenCalled();
    req.flush(null, { status: 500, statusText: 'Server Error' });
    expect(loadingServiceSpy.stopLoading).toHaveBeenCalled();
  });
});
