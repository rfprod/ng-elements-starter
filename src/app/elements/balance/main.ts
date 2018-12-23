import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BalanceElementModule } from './balance-element.module';
import { environment } from '../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BalanceElementModule)
  .catch(err => console.error(err));
