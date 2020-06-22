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
import { concatMap, filter, first } from 'rxjs/operators';

import { AppBalance, IThemeColorChange } from '../../../interfaces/index';
import { AppBalanceService } from '../../../services/balance/balance.service';
import { AppUserService } from '../../../services/user/user.service';

/**
 * Balance index
 */
@Component({
  selector: 'app-balance-index',
  templateUrl: './balance-index.component.html',
  styleUrls: ['./balance-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBalanceIndexComponent implements OnInit, OnChanges {
  /**
   * Balance change event emitter.
   */
  @Output() public readonly balanceChange: EventEmitter<AppBalance> = new EventEmitter();

  /**
   * Component theme.
   */
  @Input() public theme: IThemeColorChange['theme'];

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Balance data.
   */
  private data: AppBalance = new AppBalance();

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(
    private readonly userService: AppUserService,
    private readonly balanceService: AppBalanceService,
  ) {}

  /**
   * Returns current balance.
   */
  public balance(): AppBalance {
    return this.data;
  }

  /**
   * Gets user balance.
   */
  public getBalance() {
    void this.userService.userToken$
      .pipe(
        filter(token => Boolean(token)),
        first(),
        concatMap(token => this.balanceService.balance(this.mock, token)),
      )
      .subscribe(
        (data: AppBalance) => {
          this.data = data;
          this.changeBalance();
        },
        () => null,
      );
  }

  /**
   * Emits balance data change event.
   */
  public changeBalance(): void {
    this.balanceChange.emit(this.data);
  }

  public ngOnInit(): void {
    this.getBalance();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (Boolean(changes.mock)) {
      this.getBalance();
    }
  }
}
