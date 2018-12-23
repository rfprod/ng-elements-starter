import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser, IBalance } from '../../../interfaces/index';

/**
 * @title Balance widget component
 */
@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class BalanceWidgetComponent implements OnInit, OnDestroy {

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
  @Input() public theme: 'primary'|'accent'|'warn' = 'primary';

  /**
   * User object.
   */
  @Input() public user: IUser = new IUser();

  /**
   * Indicates if mocked server should be used.
   */
  public mock: boolean = true;

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectServer(event: { mock: boolean }): void {
    this.mock = event.mock;
  }

  /**
   * Balance data change event handler.
   */
  public balanceChangeHandler(event: IBalance): void {
    console.log('Balance widget: balanceChangeHandler, event', event);
  }

  public ngOnInit(): void {
    console.log('Balance widget initialized');
    this.userService.SaveUser(this.user);
  }

  public ngOnDestroy(): void {
    console.log('Balance widget destroyed');
  }

}
