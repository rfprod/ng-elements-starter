import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AppBalanceWidgetComponent } from '../balance-widget/balance-widget.component';

/**
 * Balance widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-balance-widget',
  // eslint-disable-next-line @angular-eslint/relative-url-prefix
  templateUrl: '../balance-widget/balance-widget.component.html',
  styleUrls: ['./balance-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBalanceWidgetElementRootComponent extends AppBalanceWidgetComponent {}
