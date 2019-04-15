import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  PassportConfigComponent,
  PassportIndexComponent,
  PassportLoginComponent,
  PassportSignupComponent,
  PassportWidgetComponent
} from './index';

import {
  CustomHttpHandlersService,
  UserService,
  AuthService
} from '../../services/index';

/**
 * Passport module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    PassportWidgetComponent,
    PassportConfigComponent, PassportIndexComponent, PassportLoginComponent, PassportSignupComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
    CustomHttpHandlersService, UserService, AuthService
  ],
  exports: [
    PassportWidgetComponent,
    PassportConfigComponent, PassportIndexComponent, PassportLoginComponent, PassportSignupComponent
  ],
  entryComponents: [
    PassportWidgetComponent,
    PassportConfigComponent, PassportIndexComponent, PassportLoginComponent, PassportSignupComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PassportModule {}
