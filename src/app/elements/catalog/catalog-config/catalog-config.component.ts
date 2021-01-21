import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { IServerChangeEvent, IThemeColorChange } from '../../../interfaces/index';

/**
 * Catalog config
 */
@Component({
  selector: 'app-catalog-config',
  templateUrl: './catalog-config.component.html',
  styleUrls: ['./catalog-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCatalogConfigComponent {
  /**
   * Component theme.
   */
  @Input() public theme: IThemeColorChange['theme'] = 'primary';

  /**
   * Component title.
   */
  @Input() public title = 'Catalog';

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
   */
  public matButtonToggleChange(event: MatButtonToggleChange): void {
    this.setTheme(event.value);
  }

  /**
   * Selects mocked/real server.
   * @param mock indicates if mocked server should be used
   */
  public selectServer(mock: boolean): void {
    const event: IServerChangeEvent = { mock };
    this.serverChange.emit(event);
  }

  /**
   * Server change event.
   */
  public serverChangeEvent(event: MatSlideToggleChange): void {
    this.mock = event.checked;
    this.selectServer(event.checked);
  }
}
