import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { UserService } from '../../../services/user/user.service';
import { BalanceService } from '../../../services/balance/balance.service';

import { IUser, IBalance } from '../../../interfaces/index';

/**
 * @title Balance index
 */
@Component({
  selector: 'balance-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        user is not logged in
      </span>
      <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>
      <!-- TODO: should it work without authentication?
      <span fxFlex="100" *ngIf="isLoggedIn()">
      -->
      <span fxFlex="100" *ngIf="isLoggedIn()">
        <p>organization: {{balance().organization}}</p>
        <p>sum1: {{balance().sum1}}</p>
        <p>sum2: {{balance().sum2}}</p>
        <p>sum3: {{balance().sum3}}</p>
        <p>sum4: {{balance().sum4}}</p>
      </span>
    </div>
  `,
  host: {
    class: 'mat-body-1'
  }
})
export class BalanceIndexComponent implements OnInit, OnChanges {

  /**
   * @param userService User service
   * @param balanceService Balance service
   */
  constructor(
    private userService: UserService,
    private balanceService: BalanceService
  ) {}

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock: boolean = true;

  /**
   * Indicates if user is logged in.
   */
  public isLoggedIn(): boolean {
    return (this.userService.getUser().token) ? true : false;
  }

  /**
   * Balance data.
   */
  private data: IBalance = new IBalance();

  /**
   * Returns current balance.
   */
  public balance(): IBalance {
    return this.data;
  }

  /**
   * UI error reporter.
   */
  public errorReport: string = '';

  /**
   * Gets user balance.
   */
  public getBalance(): void {
    const serviceModel: IUser = this.userService.getUser();
    this.balanceService.balance(this.mock, serviceModel.token || '$TOKEN').subscribe(
      (data: IBalance) => {
        console.log('balance request, data', data);
        this.data = data;
        this.changeBalance();
      },
      (error: any) => {
        console.log('balance request, error', error);
        this.errorReport = error;
        setTimeout(() => {
          this.errorReport = '';
        }, 2500);
      }
    );
  }

  /**
   * Balance change event emitter.
   */
  @Output() public balanceChange: EventEmitter<IBalance> = new EventEmitter();

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
    console.log('balance changes', changes);
    if (changes.mock) {
      this.getBalance();
    }
  }

}
