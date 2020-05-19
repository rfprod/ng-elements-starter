import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { IColorThemeChangeEvent, IServerChangeEvent } from '../../../interfaces/index';

/**
 * Passport config
 */
@Component({
  selector: 'app-passport-config',
  templateUrl: './passport-config.component.html',
  host: {
    class: 'mat-body-1',
  },
})
export class PassportConfigComponent {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Component title.
   */
  @Input() public title = 'Passport';

  /**
   * Insicates if mocked server should be used.
   */
  @Input() public mock = true;

  /**
   * Server change event emitter.
   */
  @Output() public serverChange: EventEmitter<IServerChangeEvent> = new EventEmitter();

  /**
   * Theme change event emitter.
   */
  @Output() public themeChange: EventEmitter<IColorThemeChangeEvent> = new EventEmitter();

  /**
   * Component hotkeys.
   */
  public hotkeys = 'Hotkeys (SHIFT +): I - index, L - login, S - signup';

  /**
   * Available themes.
   */
  public themes: ('primary' | 'accent' | 'warn')[] = ['primary', 'accent', 'warn'];

  /**
   * Sets a theme as a current.
   * @param theme theme name
   */
  public setTheme(theme: 'primary' | 'accent' | 'warn'): void {
    this.theme = theme;
    this.themeChange.emit({ theme: this.theme });
  }

  /**
   * Theme button group toggle change event.
   * @param event button group toggle change event
   */
  public matButtonToggleChange(event: MatButtonToggleChange): void {
    this.setTheme(event.value);
  }

  /**
   * Selects mocked/real server
   * @param mock indicates if mocked server should be used
   */
  public selectServer(mock: boolean): void {
    this.serverChange.emit({ mock });
  }

  /**
   * Server change event
   * @param event change event
   */
  public serverChangeEvent(event: MatSlideToggleChange): void {
    this.mock = event.checked;
    this.selectServer(event.checked);
  }
}
