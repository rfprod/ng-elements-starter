import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { UserService } from '../../../services/user/user.service';
import { OrdersService } from '../../../services/orders/orders.service';

import { IUser } from '../../../interfaces/index';

/**
 * @title Orders index
 */
@Component({
  selector: 'orders-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        user is not logged in
      </span>
      <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>
      <!-- TODO: should it work without authentication?
      <mat-accordion fxFlex="100" *ngIf="isLoggedIn()">
      -->
      <mat-accordion fxFlex="100" *ngIf="isLoggedIn()">
        <mat-expansion-panel *ngFor="let order of orders()">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{order.id}}
            </mat-panel-title>
            <mat-panel-description>
              <span fxFlex>{{order.status}}</span>
              <span fxFlex>{{order.date}}</span>
              <span fxFlex>{{order.goods.length}}</span>
              <span fxFlex>{{order.sum}}</span>
            </mat-panel-description>
          </mat-expansion-panel-header>

          <span>
            <p *ngFor="let item of order.goods">{{item}}</p>
          </span>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  host: {
    class: 'mat-body-1'
  }
})
export class OrdersIndexComponent implements OnInit, OnChanges {

  /**
   * @param userService User service
   * @param ordersService Orders service
   */
  constructor(
    private userService: UserService,
    private ordersService: OrdersService
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
   * Orders data.
   */
  private data: string[] = [];

  /**
   * Returns current orders.
   */
  public orders(): any[] {
    return this.data;
  }

  /**
   * UI error reporter.
   */
  public errorReport: string = '';

  /**
   * Gets user orders.
   */
  public getOrders(): void {
    const serviceModel: IUser = this.userService.getUser();
    this.ordersService.orders(this.mock, serviceModel.token || '$TOKEN').subscribe(
      (data: string[]) => {
        console.log('orders request, data', data);
        this.data = data;
        this.changeOrders();
      },
      (error: any) => {
        console.log('orders request, error', error);
        this.errorReport = error;
        setTimeout(() => {
          this.errorReport = '';
        }, 2500);
      }
    );
  }

  /**
   * Orders change event emitter.
   */
  @Output() public ordersChange: EventEmitter<string[]> = new EventEmitter();

  /**
   * Emits orders data change event.
   */
  public changeOrders(): void {
    this.ordersChange.emit(this.data);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.getOrders();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('orders changes', changes);
    if (changes.mock) {
      this.getOrders();
    }
  }

}
