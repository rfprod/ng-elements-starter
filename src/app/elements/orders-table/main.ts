import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { OrdersTableElementModule } from './orders-table-element.module';
import { environment } from '../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(OrdersTableElementModule)
  .catch(err => console.error(err));
