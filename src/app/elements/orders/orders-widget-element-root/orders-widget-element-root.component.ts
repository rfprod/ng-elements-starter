import { Component, ViewEncapsulation } from '@angular/core';

import { OrdersWidgetComponent } from '../orders-widget/orders-widget.component';

/**
 * Orders widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-orders-widget',
  templateUrl: '../orders-widget/orders-widget.component.html',
  styleUrls: ['./orders-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class OrdersWidgetElementRootComponent extends OrdersWidgetComponent {}
