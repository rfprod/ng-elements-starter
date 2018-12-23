import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModuleWithProviders } from '../../modules/material/custom-material.module';

import {
  ChatAvatarComponent,
  ChatWidgetComponent,
  ChatInputComponent,
  ChatConfigComponent
} from './index';

/**
 * @title Chat module
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, CustomMaterialModuleWithProviders
  ],
  declarations: [
    ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent
  ],
  exports: [
    ChatWidgetComponent, ChatConfigComponent
  ],
  entryComponents: [
    ChatWidgetComponent, ChatConfigComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ChatModule {}
