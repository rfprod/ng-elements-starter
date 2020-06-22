import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '../../../environments/environment';
import { AppBalanceElementModule } from './balance-element.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppBalanceElementModule)
  .catch(err => {
    console.error(err);
  });
