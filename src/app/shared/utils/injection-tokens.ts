import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('Window', {
  providedIn: 'root',
  factory: () => window,
});
