import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser, IBalance } from '../../../interfaces/index';

/**
 * Balance widget component
 */
@Component({
  selector: 'balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class BalanceWidgetComponent implements OnInit {

  /**
   * Constructor.
   * @param userService Users service
   */
  constructor(
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
  public mock = true;

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
    this.userService.SaveUser(this.user);
  }

}
