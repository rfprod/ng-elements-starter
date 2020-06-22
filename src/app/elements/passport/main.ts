import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../../environments/environment';
import { AppPassportElementModule } from './passport-element.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppPassportElementModule)
  .catch(err => {
    console.error(err);
  });
