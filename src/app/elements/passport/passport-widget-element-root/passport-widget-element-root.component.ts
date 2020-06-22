import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { fadeIn, fadeInOut } from '../animations';
import { AppPassportWidgetComponent } from '../passport-widget/passport-widget.component';

/**
 * Passport widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-passport-widget',
  // eslint-disable-next-line @angular-eslint/relative-url-prefix
  templateUrl: '../passport-widget/passport-widget.component.html',
  styleUrls: ['./passport-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [fadeInOut, fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPassportWidgetElementRootComponent extends AppPassportWidgetComponent {}
