import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PrivateOrdersTableElementModule } from './private-orders-table-element.module';
import { environment } from '../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PrivateOrdersTableElementModule)
  .catch(err => console.error(err));
