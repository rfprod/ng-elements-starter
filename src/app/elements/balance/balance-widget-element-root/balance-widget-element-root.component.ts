import { Component, ViewEncapsulation } from '@angular/core';

import { BalanceWidgetComponent } from '../balance-widget/balance-widget.component';

/**
 * Balance widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-balance-widget',
  templateUrl: '../balance-widget/balance-widget.component.html',
  styleUrls: ['./balance-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BalanceWidgetElementRootComponent extends BalanceWidgetComponent {}
