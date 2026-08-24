import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withXhr, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideZoneChangeDetection()
  ]
})
  .catch(err => console.error(err));
