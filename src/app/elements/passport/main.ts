import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PassportElementModule } from './passport-element.module';
import { environment } from '../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PassportElementModule)
  .catch(err => console.error(err));
