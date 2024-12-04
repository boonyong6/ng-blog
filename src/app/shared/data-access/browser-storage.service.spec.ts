import { TestBed } from '@angular/core/testing';

import { Provider } from '@angular/core';
import {
  BROWSER_STORAGE,
  BrowserStorageService,
} from './browser-storage.service';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const _storageSpy = jasmine.createSpyObj<Storage>(['setItem']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BROWSER_STORAGE, useValue: _storageSpy } as Provider,
      ],
    });
    service = TestBed.inject(BrowserStorageService);
    storageSpy = TestBed.inject(BROWSER_STORAGE) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#set should set item in storage', () => {
    const key = 'themeMode';
    const value = 'system';

    service.set(key, value);

    expect(storageSpy.setItem).toHaveBeenCalledWith(key, value);
  });
});
