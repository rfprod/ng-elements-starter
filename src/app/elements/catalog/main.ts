import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../../environments/environment';
import { AppCatalogElementModule } from './catalog-element.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppCatalogElementModule)
  .catch(err => {
    console.error(err);
  });
