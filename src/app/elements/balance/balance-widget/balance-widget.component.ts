import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { AppBalance, AppUser } from '../../../interfaces/index';
import { AppUserService } from '../../../services/user/user.service';

/**
 * Balance widget component
 */
@Component({
  selector: 'app-balance-widget',
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBalanceWidgetComponent implements OnInit, OnChanges {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * User object.
   */
  @Input() public user = new AppUser();

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
   *
   * @param userService Users service
   */
  constructor(private readonly userService: AppUserService) {}

  /**
   * Selects real or mocked server., used in config callback.
   *
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
  public balanceChangeHandler(event: AppBalance): AppBalance {
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
