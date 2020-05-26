import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { IBalance, IUser } from '../../../interfaces/index';
import { UserService } from '../../../services/user/user.service';

/**
 * Balance widget component
 */
@Component({
  selector: 'app-balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.scss'],
})
export class BalanceWidgetComponent implements OnInit, OnChanges {
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
   * Server change output.
   */
  @Output() public readonly serverChange = new EventEmitter<{ mock: boolean }>();

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
    const mock = event.mock;
    this.mock = mock;
    this.serverChange.emit({ mock });
  }

  /**
   * Balance data change event handler.
   */
  public balanceChangeHandler(event: IBalance): IBalance {
    // TODO
    return event;
  }

  public ngOnInit(): void {
    this.userService.saveUser(this.user);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('mock' in changes) {
      const mock = changes.mock.currentValue;
      this.selectServer({ mock });
      this.serverChange.emit({ mock });
    }
  }
}
