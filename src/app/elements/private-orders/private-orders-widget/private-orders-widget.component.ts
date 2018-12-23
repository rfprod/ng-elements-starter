import { Component, ElementRef, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser } from '../../../interfaces/index';

import { IColorThemeChangeEvent, IServerChangeEvent } from '../../../interfaces/index';

/**
 * @title Private orders widget component
 */
@Component({
  selector: 'private-orders-widget',
  templateUrl: './private-orders-widget.component.html',
  styleUrls: ['./private-orders-widget.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class PrivateOrdersWidgetComponent implements OnInit, OnDestroy {

  /**
   * @param el Element reference
   * @param userService Users service
   */
  constructor(
    private el: ElementRef,
    private userService: UserService
  ) {}

  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * User object.
   */
  @Input() public user: IUser = new IUser();

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock: boolean = true;

  /**
   * Indicates if config should be shown.
   */
  @Input() public displayConfig: boolean = true;

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectServer(event: IServerChangeEvent): void {
    this.mock = event.mock;
  }

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectTheme(event: IColorThemeChangeEvent): void {
    this.theme = event.theme;
  }

  /**
   * Orders data change event handler.
   */
  public ordersChangeHandler(event: string[]): void {
    console.log('PrivateOrders widget: ordersChangeHandler, event', event);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    console.log('PrivateOrders widget initialized');
    this.userService.SaveUser(this.user);
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('PrivateOrders widget destroyed');
  }

}
