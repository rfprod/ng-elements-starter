import { Component, ViewEncapsulation } from '@angular/core';

import { fadeIn, fadeInOut } from '../animations';
import { PassportWidgetComponent } from '../passport-widget/passport-widget.component';

/**
 * Passport widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-passport-widget',
  templateUrl: '../passport-widget/passport-widget.component.html',
  styleUrls: ['./passport-widget-element-root.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [fadeInOut, fadeIn],
})
export class PassportWidgetElementRootComponent extends PassportWidgetComponent {}
