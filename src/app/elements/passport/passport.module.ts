import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { getWindow, WINDOW } from 'src/app/utils';

import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { AuthService, CustomHttpHandlersService, UserService } from '../../services/index';
import {
  PassportConfigComponent,
  PassportIndexComponent,
  PassportLoginComponent,
  PassportSignupComponent,
  PassportWidgetComponent,
} from './index';

/**
 * Passport module
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
  ],
  declarations: [
    PassportWidgetComponent,
    PassportConfigComponent,
    PassportIndexComponent,
    PassportLoginComponent,
    PassportSignupComponent,
  ],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    CustomHttpHandlersService,
    UserService,
    AuthService,
  ],
  exports: [
    PassportWidgetComponent,
    PassportConfigComponent,
    PassportIndexComponent,
    PassportLoginComponent,
    PassportSignupComponent,
  ],
  entryComponents: [
    PassportWidgetComponent,
    PassportConfigComponent,
    PassportIndexComponent,
    PassportLoginComponent,
    PassportSignupComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PassportModule {}
