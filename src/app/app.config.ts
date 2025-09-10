import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {CookieService} from 'ngx-cookie-service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/Header/header-interceptor';
import { errorInterceptor } from './core/interceptors/Error/error-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor , errorInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    importProvidersFrom(CookieService),
    provideToastr(),
  ],
};
