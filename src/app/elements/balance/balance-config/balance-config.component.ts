import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { IServerChangeEvent, IThemeColorChange } from '../../../interfaces/index';

/**
 * Balance config
 */
@Component({
  selector: 'app-balance-config',
  templateUrl: './balance-config.component.html',
  styleUrls: ['./balance-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBalanceConfigComponent {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Component title.
   */
  @Input() public title = 'Balance';

  /**
   * Theme change event emitter.
   */
  @Output() public readonly themeChange: EventEmitter<IThemeColorChange> = new EventEmitter();

  /**
   * Server change event emitter.
   */
  @Output() public readonly serverChange: EventEmitter<IServerChangeEvent> = new EventEmitter();

  /**
   * Insicates if mocked server should be used.
   */
  public mock = true;

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
