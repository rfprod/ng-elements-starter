import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { timer } from 'rxjs';
import { IBalance, IUser } from '../../../interfaces/index';
import { BalanceService } from '../../../services/balance/balance.service';
import { UserService } from '../../../services/user/user.service';
import { ETIMEOUT } from '../../../utils/constants';

/**
 * Balance index
 */
@Component({
  selector: 'app-balance-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        user is not logged in
      </span>
      <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>
      <span fxFlex="100" *ngIf="isLoggedIn()">
        <p>organization: {{ balance().organization }}</p>
        <p>sum1: {{ balance().sum1 }}</p>
        <p>sum2: {{ balance().sum2 }}</p>
        <p>sum3: {{ balance().sum3 }}</p>
        <p>sum4: {{ balance().sum4 }}</p>
      </span>
    </div>
  `,
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
   * UI error reporter.
   */
  public errorReport = '';

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
    return this.userService.getUser().token ? true : false;
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
  public getBalance(): void {
    const serviceModel: IUser = this.userService.getUser();
    this.balanceService.balance(this.mock, serviceModel.token || '$TOKEN').subscribe(
      (data: IBalance) => {
        this.data = data;
        this.changeBalance();
      },
      (error: any) => {
        this.errorReport = error;
        timer(ETIMEOUT.MEDUIM).subscribe(_ => {
          this.errorReport = '';
        });
      },
    );
  }

  /**
   * Emits balance data change event.
   */
  public changeBalance(): void {
    this.balanceChange.emit(this.data);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.getBalance();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mock) {
      this.getBalance();
    }
  }
}
