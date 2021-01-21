import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AppBalanceWidgetComponent } from './balance-widget.component';

/**
 * Balance widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-balance-widget-element',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget-element.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBalanceWidgetElementRootComponent extends AppBalanceWidgetComponent {}
