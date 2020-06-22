import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppUiStoreModule } from 'src/app/state/theme/ui.module';
import { getWindow, WINDOW } from 'src/app/utils';

import { AppMaterialModule } from '../../modules/material/custom-material.module';
import {
  AppOrdersConfigComponent,
  AppOrdersIndexComponent,
  AppOrdersWidgetComponent,
} from './index';

/**
 * Orders module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule,
    NgxsFormPluginModule,
    AppUiStoreModule,
  ],
  declarations: [AppOrdersWidgetComponent, AppOrdersConfigComponent, AppOrdersIndexComponent],
  providers: [{ provide: WINDOW, useFactory: getWindow }],
  exports: [AppOrdersWidgetComponent, AppOrdersConfigComponent, AppOrdersIndexComponent],
  entryComponents: [AppOrdersWidgetComponent, AppOrdersConfigComponent, AppOrdersIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppOrdersModule {}
