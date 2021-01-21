import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { fadeIn, fadeInOut } from '../animations';
import { AppPassportWidgetComponent } from './passport-widget.component';

/**
 * Passport widget component that should be bootstrapped when using it as a custom web element.
 */
@Component({
  selector: 'app-passport-widget-element',
  templateUrl: './passport-widget.component.html',
  styleUrls: ['./passport-widget-element.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [fadeInOut, fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPassportWidgetElementRootComponent extends AppPassportWidgetComponent {}
