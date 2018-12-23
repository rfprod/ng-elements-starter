import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

import { IColorThemeChangeEvent } from '../../../interfaces/index';

/**
 * @title Table config
 */
@Component({
  selector: 'table-config',
  template: `
    <mat-toolbar [color]="theme">
      <span fxFlex="0 1 auto">
        {{title}}
      </span>
      <span fxFlex="1 1 auto"></span>
      <span fxFlex="0 1 auto">
        <mat-button-toggle-group #group="matButtonToggleGroup" [value]="theme" (change)="matButtonToggleChange($event)" [name]="title" [attr.aria-label]="title">
          <mat-button-toggle *ngFor="let item of themes" value="{{item}}" [matTooltip]="item" matTooltipPosition="below">
            <mat-icon class="material-icons" [color]="item">brush</mat-icon>
          </mat-button-toggle>
        </mat-button-toggle-group>
      </span>
    </mat-toolbar>
  `,
  host: {
    class: 'mat-body-1'
  }
})
export class TableConfigComponent {

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn';

  /**
   * Component title.
   */
  @Input() public title: string = 'Table';

  /**
   * Theme change event emitter.
   */
  @Output() public themeChange: EventEmitter<IColorThemeChangeEvent> = new EventEmitter();

  /**
   * Available themes.
   */
  public themes: ('primary'|'accent'|'warn')[] = ['primary', 'accent', 'warn'];

  /**
   * Sets a theme as a current.
   * @param theme theme name
   */
  public setTheme(theme: 'primary'|'accent'|'warn'): void {
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

}
