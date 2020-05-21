import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { UiStoreModule } from 'src/app/state/theme/ui.module';
import { getWindow, WINDOW } from 'src/app/utils';

import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { BalanceService, HttpHandlersService, UserService } from '../../services/index';
import { BalanceConfigComponent, BalanceIndexComponent, BalanceWidgetComponent } from './index';

/**
 * Balance module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    CustomMaterialModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule,
    NgxsFormPluginModule,
    UiStoreModule,
  ],
  declarations: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    HttpHandlersService,
    UserService,
    BalanceService,
  ],
  exports: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  entryComponents: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BalanceModule {}
