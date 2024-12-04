import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#startLoading should emit `true` value', () => {
    service.startLoading();

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
  });

  it('#stopLoading should emit `false` value', () => {
    service.startLoading();
    service.startLoading(); // Second request starts before first request end.
    service.stopLoading();
    service.stopLoading();

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
    });
  });
});
