import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';

/**
 * Application index component
 * @description Includes element modules
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss'],
  host: {
    class: 'mat-body-1',
  },
})
export class AppIndexComponent {
  /**
   * Component theme color.
   */
  public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * Defines if UI should use alternative dark material theme.
   */
  @HostBinding('class.unicorn-dark-theme') public darkTheme = false;
  /**
   * Constructor.
   * @param overlayContainer Overlay container
   */
  constructor(public overlayContainer: OverlayContainer) {}

  /**
   * Toggles application material theme.
   */
  public toggleMaterialTheme(): void {
    if (this.darkTheme) {
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    }
    this.darkTheme = !this.darkTheme;
  }
}
