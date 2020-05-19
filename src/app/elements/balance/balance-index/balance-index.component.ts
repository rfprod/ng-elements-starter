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
import { BalanceService } from '../../../services/balance/balance.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Balance index
 */
@Component({
  selector: 'app-balance-index',
  templateUrl: './balance-index.component.html',
  host: {
    class: 'mat-body-1',
  },
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

  /**
   * Constructor.
   * @param userService User service
   * @param balanceService Balance service
   */
  constructor(
    private readonly userService: UserService,
    private readonly balanceService: BalanceService,
  ) {}

  /**
   * Indicates if user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

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
    const serviceModel: IUser = this.userService.getUser();
    void this.balanceService
      .balance(this.mock, Boolean(serviceModel.token) ? serviceModel.token : '$TOKEN')
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
