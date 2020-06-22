import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { AppUiService } from './ui.service';
import { AppUiState } from './ui.store';

export const uiStoreModuleProviders: Provider[] = [AppUiService];

@NgModule({
  imports: [MatSidenavModule, OverlayModule, NgxsModule.forFeature([AppUiState])],
  providers: [],
})
export class AppUiStoreModule {
  public static forRoot(): ModuleWithProviders<AppUiStoreModule> {
    return {
      ngModule: AppUiStoreModule,
      providers: [],
    };
  }
}
