import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http'; // ✅ Import necessário

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient(withFetch()), // ✅ Configuração correta para HttpClient
  ],
};
