import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  MARKED_OPTIONS,
  provideMarkdown,
} from 'ngx-markdown';
import { routes } from './app.routes';
import { markedOptionsFactory } from './posts/utils/marked-options-factory';
import { commonErrorHandlingInterceptor } from './shared/data-access/common-error-handling.interceptor';
import { loadingOverlayFeature } from './shared/data-access/loading-overlay.reducer';
import { loadingInterceptor } from './shared/data-access/loading.interceptor';
import { TemplatePageTitleStrategy } from './shared/utils/services/template-page-title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([loadingInterceptor, commonErrorHandlingInterceptor]),
    ),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
    }),
    provideStore(),
    provideState(loadingOverlayFeature),
  ],
};
