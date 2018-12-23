import { Component, ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser } from '../../../interfaces/index';

/**
 * @title Orders table widget component
 */
@Component({
  selector: 'orders-table-widget',
  templateUrl: './orders-table-widget.component.html',
  styleUrls: ['./orders-table-widget.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class OrdersTableWidgetComponent implements OnInit, OnChanges, OnDestroy {

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
   * Indicated if passport config should be displayed.
   */
  @Input() public displayConfig: boolean = true;

  /**
   * User object.
   */
  @Input() public user: IUser = new IUser();

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock: boolean = true;

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
    console.log('Orders table widget initialized');
    this.userService.SaveUser(this.user);
  }

  /**
   * Lifecycle hook called on component input changes.
   * @param changes input changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    console.log('Orders table widget input change', changes);
    if ('mock' in changes) {
      this.selectServer({ mock: changes.mock.currentValue });
    }
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('Orders table widget destroyed');
  }

}
