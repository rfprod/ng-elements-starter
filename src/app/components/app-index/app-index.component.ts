import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding
} from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay';

/**
 * @title Application index component
 * @description Includes element modules
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class AppIndexComponent implements OnInit, OnDestroy {

  /**
   * AppIndexComponent constructor.
   * @param overlayContainer Overlay container
   */
  constructor(
    public overlayContainer: OverlayContainer
  ) {}

  /**
   * Component theme color.
   */
  public theme: 'primary'|'accent'|'warn' = 'primary';

  /**
	 * Defines if UI should use alternative dark material theme.
	 */
	@HostBinding('class.unicorn-dark-theme') public darkTheme: boolean = false;

  /**
   * Toggles application material theme.
   */
  public toggleMaterialTheme(): void {
    console.log('TODO: toggle material theme');
    if (this.darkTheme) {
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    }
    this.darkTheme = !this.darkTheme;
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    console.log('AppIndex component initialized');
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('AppIndex component destroyed');
  }

}
