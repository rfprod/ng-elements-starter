import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser } from '../../../interfaces/index';

/**
 * Orders widget component
 */
@Component({
  selector: 'orders-widget',
  templateUrl: './orders-widget.component.html',
  styleUrls: ['./orders-widget.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class OrdersWidgetComponent implements OnInit, OnChanges {

  /**
   * Constructor.
   * @param el Element reference
   * @param userService Users service
   */
  constructor(
    private userService: UserService
  ) {}

  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * Indicated if passport config should be displayed.
   */
  @Input() public displayConfig = true;

  /**
   * User object.
   */
  @Input() public user: IUser = new IUser();

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock = true;

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectServer(event: { mock: boolean }): void {
    this.mock = event.mock;
  }

  /**
   * Orders data change event handler.
   */
  public ordersChangeHandler(event: string[]): void {
    console.log('Orders widget: ordersChangeHandler, event', event);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.userService.SaveUser(this.user);
  }

  /**
   * Lifecycle hook called on component input changes.
   * @param changes input changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if ('mock' in changes) {
      this.selectServer({ mock: changes.mock.currentValue });
    }
  }

}
