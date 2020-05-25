import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../../environments/environment';
import { CatalogElementModule } from './catalog-element.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CatalogElementModule)
  .catch(err => {
    console.error(err);
  });
