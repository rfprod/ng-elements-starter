import { Component, Input, OnInit } from '@angular/core';

import { IBalance, IUser } from '../../../interfaces/index';
import { UserService } from '../../../services/user/user.service';

/**
 * Balance widget component
 */
@Component({
  selector: 'app-balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.scss'],
  host: {
    class: 'mat-body-1',
  },
})
export class BalanceWidgetComponent implements OnInit {
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
  public mock = true;

  /**
   * Constructor.
   * @param userService Users service
   */
  constructor(private readonly userService: UserService) {}

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
  public balanceChangeHandler(event: IBalance): IBalance {
    // TODO
    return event;
  }

  public ngOnInit(): void {
    this.userService.SaveUser(this.user);
  }
}
