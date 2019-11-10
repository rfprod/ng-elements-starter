import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange, MatSlideToggleChange } from '@angular/material';

import { IColorThemeChangeEvent, IServerChangeEvent } from '../../../interfaces/index';

/**
 * Orders config
 */
@Component({
  selector: 'orders-config',
  template: `
    <mat-toolbar [color]="theme">
      <mat-toolbar-row>
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
      </mat-toolbar-row>
      <mat-toolbar-row>
        <span fxFlex="1 1 auto"></span>
        <span fxFlex="0 1 auto">
          <mat-slide-toggle [color]="theme" [checked]="mock" (change)="serverChangeEvent($event)">
            Server:
            <span *ngIf="mock">mock</span>
            <span *ngIf="!mock">real</span>
          </mat-slide-toggle>
        </span>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  host: {
    class: 'mat-body-1'
  }
})
export class OrdersConfigComponent {

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn';

  /**
   * Component title.
   */
  @Input() public title = 'Orders';

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
