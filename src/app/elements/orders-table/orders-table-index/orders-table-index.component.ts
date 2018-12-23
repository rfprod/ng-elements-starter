import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { UserService } from '../../../services/user/user.service';
import { OrdersService } from '../../../services/orders/orders.service';

import { IUser } from '../../../interfaces/index';

/**
 * @title Orders table index
 */
@Component({
  selector: 'orders-table-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        user is not logged in
      </span>
      <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>
      <!-- TODO: should it work without authentication?
      <mat-accordion fxFlex="100" *ngIf="isLoggedIn()">
      -->

      <table mat-table [dataSource]="orders()" class="mat-elevation-z8" fxFlex="100">
        <!--- Note that these columns can be defined in any order.
              The actual rendered columns are set as a property on the row definition" -->

        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> Id </th>
          <td mat-cell *matCellDef="let order"> {{order.id}} </td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let order"> {{order.status}} </td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date </th>
          <td mat-cell *matCellDef="let order"> {{order.date}} </td>
        </ng-container>

        <!-- Sum Column -->
        <ng-container matColumnDef="sum">
          <th mat-header-cell *matHeaderCellDef> Sum </th>
          <td mat-cell *matCellDef="let order"> {{order.sum}} </td>
        </ng-container>

        <!-- Goods Column -->
        <ng-container matColumnDef="goods">
          <th mat-header-cell *matHeaderCellDef> Goods </th>
          <td mat-cell *matCellDef="let order">
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  {{order.goods.length}}
                </mat-panel-title>
                <mat-panel-description>
                  <span fxFlex>click for goods list</span>
                </mat-panel-description>
              </mat-expansion-panel-header>

              <span>
                <p *ngFor="let item of order.goods">{{item}}</p>
              </span>
            </mat-expansion-panel>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  host: {
    class: 'mat-body-1'
  }
})
export class OrdersTableIndexComponent implements OnInit, OnChanges {

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
   * Displayed table columns, corresponds order data model.
   */
  public displayedColumns: ('id'|'status'|'date'|'goods'|'sum')[] = ['id', 'status', 'date', 'sum', 'goods'];

  /**
   * Orders data.
   */
  private data: any[] = [];

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
      (data: any[]) => {
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
