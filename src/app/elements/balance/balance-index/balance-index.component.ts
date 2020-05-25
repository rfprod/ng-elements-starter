import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { concatMap, filter, first } from 'rxjs/operators';

import { IBalance } from '../../../interfaces/index';
import { BalanceService } from '../../../services/balance/balance.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Balance index
 */
@Component({
  selector: 'app-balance-index',
  templateUrl: './balance-index.component.html',
  styleUrls: ['./balance-index.component.scss'],
})
export class BalanceIndexComponent implements OnInit, OnChanges {
  /**
   * Balance change event emitter.
   */
  @Output() public balanceChange: EventEmitter<IBalance> = new EventEmitter();

  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Balance data.
   */
  private data: IBalance = new IBalance();

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(
    private readonly userService: UserService,
    private readonly balanceService: BalanceService,
  ) {}

  /**
   * Returns current balance.
   */
  public balance(): IBalance {
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
        (data: IBalance) => {
          this.data = data;
          this.changeBalance();
        },
        _ => null,
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
    if (changes.mock) {
      this.getBalance();
    }
  }
}
