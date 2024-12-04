import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { commonErrorHandlingInterceptor } from './common-error-handling.interceptor';

describe('commonErrorHandlingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() =>
      commonErrorHandlingInterceptor(req, next),
    );
  let routerSpy: jasmine.SpyObj<Router>;
  let httpTesting: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    const _routerSpy = jasmine.createSpyObj<Router>(['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: _routerSpy } as Provider,
        provideHttpClient(withInterceptors([commonErrorHandlingInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    httpTesting = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should navigate to not-found route when error response status is 404', () => {
    const url = 'https://example.com/';

    firstValueFrom(http.get(url));

    const req = httpTesting.expectOne(url, 'Any URL');
    req.flush('Not Found!', {
      status: HttpStatusCode.NotFound,
      statusText: 'Not Found',
    } as HttpErrorResponse);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['not-found'], {
      replaceUrl: true,
    });
  });

  it('should navigate to server-error route when error response status is other than 404', () => {
    const url = 'https://example.com/';

    firstValueFrom(http.get(url));

    const req = httpTesting.expectOne(url, 'Any URL');
    req.flush('Unknown!', {
      status: 0,
      statusText: 'Unknown',
    } as HttpErrorResponse);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['server-error'], {
      replaceUrl: true,
    });
  });
});
