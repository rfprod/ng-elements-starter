import { Component, ViewEncapsulation } from '@angular/core';

import { CatalogWidgetComponent } from '../catalog-widget/catalog-widget.component';

/**
 * Catalog widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-catalog-widget',
  templateUrl: '../catalog-widget/catalog-widget.component.html',
  styleUrls: ['./catalog-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CatalogWidgetElementRootComponent extends CatalogWidgetComponent {}
