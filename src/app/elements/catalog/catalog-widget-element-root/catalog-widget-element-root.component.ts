import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AppCatalogWidgetComponent } from '../catalog-widget/catalog-widget.component';

/**
 * Catalog widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-catalog-widget',
  // eslint-disable-next-line @angular-eslint/relative-url-prefix
  templateUrl: '../catalog-widget/catalog-widget.component.html',
  styleUrls: ['./catalog-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCatalogWidgetElementRootComponent extends AppCatalogWidgetComponent {}
