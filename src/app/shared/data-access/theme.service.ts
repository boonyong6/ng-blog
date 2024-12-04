import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { Theme, ThemeMode } from './types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_MODE_KEY = 'themeMode';
  private theme: Theme;

  constructor(
    private browserStorageService: BrowserStorageService,
    private mediaMatcher: MediaMatcher,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    const mode = this.getMode();
    const isDarkMode = this.isDarkMode(mode);

    this.theme = {
      mode,
      isDarkMode,
    };
  }

  getTheme(): Theme {
    return Object.assign({}, this.theme);
  }

  setMode(mode: ThemeMode): void {
    this.theme = {
      mode,
      isDarkMode: this.isDarkMode(mode),
    };

    this.browserStorageService.set(this.THEME_MODE_KEY, this.theme.mode);

    if (this.theme.isDarkMode) {
      this.doc.documentElement.dataset[this.THEME_MODE_KEY] = 'dark';
      return;
    }

    delete this.doc.documentElement.dataset[this.THEME_MODE_KEY];
  }

  private getMode(): ThemeMode {
    const themeModes = Object.values(ThemeMode) as string[];
    const themeMode = this.browserStorageService
      .get(this.THEME_MODE_KEY)
      ?.toLowerCase();

    if (themeMode && themeModes.includes(themeMode)) {
      return themeMode as ThemeMode;
    }

    return ThemeMode.System;
  }

  private isDarkMode(mode: ThemeMode): boolean {
    if (
      mode === ThemeMode.Dark ||
      (mode === ThemeMode.System &&
        this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return true;
    }

    return false;
  }
}
