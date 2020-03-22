import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WINDOW, getWindow } from 'src/app/utils';
import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { CatalogueService, CustomHttpHandlersService, UserService } from '../../services/index';
import {
  CatalogueConfigComponent,
  CatalogueIndexComponent,
  CatalogueWidgetComponent,
} from './index';

/**
 * Catalogue module
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
  declarations: [CatalogueWidgetComponent, CatalogueConfigComponent, CatalogueIndexComponent],
  providers: [
    { provide: WINDOW, useFactory: getWindow },
    CustomHttpHandlersService,
    UserService,
    CatalogueService,
  ],
  exports: [CatalogueWidgetComponent, CatalogueConfigComponent, CatalogueIndexComponent],
  entryComponents: [CatalogueWidgetComponent, CatalogueConfigComponent, CatalogueIndexComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CatalogueModule {}
