import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../../environments/environment';
import { PassportElementModule } from './passport-element.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(PassportElementModule)
  .catch(err => {
    console.error(err);
  });
