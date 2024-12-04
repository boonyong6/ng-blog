import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserStorageService } from './browser-storage.service';
import { ThemeService } from './theme.service';
import { ThemeMode } from './types';

describe('ThemeService', () => {
  let service: ThemeService;
  let browserStorageServiceSpy: jasmine.SpyObj<BrowserStorageService>;
  let mediaMatcherSpy: jasmine.SpyObj<MediaMatcher>;
  let doc: Document;

  beforeEach(() => {
    const _browserStorageServiceSpy =
      jasmine.createSpyObj<BrowserStorageService>(['get', 'set']);
    _browserStorageServiceSpy.get.and.returnValue('system');

    const _mediaMatcherSpy = jasmine.createSpyObj<MediaMatcher>(['matchMedia']);
    // Mock `(prefers-color-scheme: dark)` matches value, and set it to `true`.
    _mediaMatcherSpy.matchMedia.and.returnValue({
      matches: true,
    } as MediaQueryList);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: BrowserStorageService,
          useValue: _browserStorageServiceSpy,
        } as Provider,
        { provide: MediaMatcher, useValue: _mediaMatcherSpy } as Provider,
      ],
    });

    service = TestBed.inject(ThemeService);
    browserStorageServiceSpy = TestBed.inject(
      BrowserStorageService,
    ) as jasmine.SpyObj<BrowserStorageService>;
    mediaMatcherSpy = TestBed.inject(
      MediaMatcher,
    ) as jasmine.SpyObj<MediaMatcher>;
    doc = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTheme should return a copy of theme object', () => {
    const theme = service.getTheme();
    theme.isDarkMode = false;

    expect(service.getTheme().isDarkMode).toBe(true);
  });

  it('#setMode should save value in browser storage', () => {
    const mode = ThemeMode.Light;

    service.setMode(mode);

    expect(browserStorageServiceSpy.set).toHaveBeenCalledWith(
      'themeMode',
      mode,
    );
  });

  it('#setMode should set value on document attribute when it is dark mode', () => {
    const mode = ThemeMode.Dark;

    service.setMode(mode);

    expect(doc.documentElement.dataset['themeMode']).toBe('dark');
  });

  it('#setMode should remove document attribute when it is not dark mode', () => {
    service.setMode(ThemeMode.Dark);
    service.setMode(ThemeMode.Light);

    expect(doc.documentElement.dataset['themeMode']).toBeUndefined();
  });
});
