import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { OrdersElementModule } from './orders-element.module';
import { environment } from '../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(OrdersElementModule)
  .catch(err => console.error(err));
