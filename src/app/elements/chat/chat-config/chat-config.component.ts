import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

/**
 * @title Chat config component
 */
@Component({
  selector: 'chat-config',
  template: `
    <mat-toolbar [color]="theme">
      <span fxFlex="0 1 auto">
        {{title}}
      </span>
      <span fxFlex="10px"></span>
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
export class ChatConfigComponent {

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn';

  /**
   * Component title.
   */
  @Input() public title: string = 'Chat';

  /**
   * Theme change event emitter.
   */
  @Output() public themeChange: EventEmitter<any> = new EventEmitter();

  /**
   * Available themes.
   */
  public themes: ('primary'|'accent'|'warn')[] = ['primary', 'accent', 'warn'];

  /**
   * Sets a theme as a current.
   * @param theme theme name
   */
  public setTheme(theme: 'primary'|'accent'|'warn') {
    this.theme = theme;
    this.themeChange.emit(this.theme);
  }

  /**
   * Theme button group toggle change event.
   * @param event button group toggle change event
   */
  public matButtonToggleChange(event: MatButtonToggleChange): void {
    this.setTheme(event.value);
  }

}
