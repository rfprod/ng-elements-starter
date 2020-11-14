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
 * Catalog widget component
 */
@Component({
  selector: 'app-catalog-widget',
  templateUrl: './catalog-widget.component.html',
  styleUrls: ['./catalog-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCatalogWidgetComponent implements OnInit, OnChanges {
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
   * Catalog data change event handler.
   */
  public catalogChangeHandler(event: string[]): string[] {
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
