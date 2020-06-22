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

import { AppUser } from '../../../interfaces/index';
import { AppUserService } from '../../../services/user/user.service';

/**
 * Orders widget component
 */
@Component({
  selector: 'app-orders-widget',
  templateUrl: './orders-widget.component.html',
  styleUrls: ['./orders-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOrdersWidgetComponent implements OnInit, OnChanges {
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
  @Input() public user = new AppUser();

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock = true;

  /**
   * Server change output.
   */
  @Output() public readonly serverChange = new EventEmitter<{ mock: boolean }>();

  /**
   * Constructor.
   * @param el Element reference
   * @param userService Users service
   */
  constructor(private readonly userService: AppUserService) {}

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
   * Orders data change event handler.
   */
  public ordersChangeHandler(event: string[]): string[] {
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
