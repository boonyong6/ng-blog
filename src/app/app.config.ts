import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  MARKED_OPTIONS,
  provideMarkdown,
} from 'ngx-markdown';
import { routes } from './app.routes';
import { loadingInterceptor } from './shared/data-access/loading.interceptor';
import { commonErrorHandlingInterceptor } from './shared/data-access/common-error-handling.interceptor';
import { markedOptionsFactory } from './posts/utils/marked-options-factory';
import { TemplatePageTitleStrategy } from './shared/utils/template-page-title-strategy.service';
import { provideStore } from '@ngrx/store';
import { loadingOverlayReducer } from './shared/data-access/loading-overlay.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
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
    provideStore({ showLoadingOverlay: loadingOverlayReducer }),
  ],
};
