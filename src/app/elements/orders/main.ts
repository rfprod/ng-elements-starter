import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../../environments/environment';
import { OrdersElementModule } from './orders-element.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(OrdersElementModule)
  .catch(err => {
    console.error(err);
  });
