import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AppOrdersWidgetComponent } from './orders-widget.component';

/**
 * Orders widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-orders-widget-element',
  templateUrl: './orders-widget.component.html',
  styleUrls: ['./orders-widget-element.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOrdersWidgetElementRootComponent extends AppOrdersWidgetComponent {}
