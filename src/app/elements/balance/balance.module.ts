import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WINDOW, getWindow } from 'src/app/utils';
import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { BalanceService, CustomHttpHandlersService, UserService } from '../../services/index';
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
  ],
  declarations: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    CustomHttpHandlersService,
    UserService,
    BalanceService,
  ],
  exports: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  entryComponents: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BalanceModule {}
