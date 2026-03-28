import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
<<<<<<< HEAD
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
=======
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
>>>>>>> 6cc1b499a2c302651d6c62e4f328730c6eca8e19

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
<<<<<<< HEAD
    providePrimeNG({ theme: { preset: Aura } })
=======
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura
      }
    })
>>>>>>> 6cc1b499a2c302651d6c62e4f328730c6eca8e19
  ]
};
