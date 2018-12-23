import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CatalogueElementModule } from './catalogue-element.module';
import { environment } from '../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CatalogueElementModule)
  .catch(err => console.error(err));
