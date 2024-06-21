import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { authTokenInterceptor } from './auth/interceptors/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:authTokenInterceptor,
    multi:true
  },provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideAnimationsAsync(),importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),provideHttpClient(),]
};
