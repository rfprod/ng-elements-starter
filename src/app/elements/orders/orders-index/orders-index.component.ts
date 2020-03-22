import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../../interfaces/index';
import { OrdersService } from '../../../services/orders/orders.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Orders index
 */
@Component({
  selector: 'app-orders-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        user is not logged in
      </span>
      <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>
      <mat-accordion fxFlex="100" *ngIf="isLoggedIn()">
        <mat-expansion-panel *ngFor="let order of orders()">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ order.id }}
            </mat-panel-title>
            <mat-panel-description>
              <span fxFlex>{{ order.status }}</span>
              <span fxFlex>{{ order.date }}</span>
              <span fxFlex>{{ order.goods.length }}</span>
              <span fxFlex>{{ order.sum }}</span>
            </mat-panel-description>
          </mat-expansion-panel-header>

          <span>
            <p *ngFor="let item of order.goods">{{ item }}</p>
          </span>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  host: {
    class: 'mat-body-1',
  },
})
export class OrdersIndexComponent implements OnInit, OnChanges {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * UI error reporter.
   */
  public errorReport = '';

  /**
   * Orders change event emitter.
   */
  @Output() public ordersChange: EventEmitter<string[]> = new EventEmitter();

  /**
   * Orders data.
   */
  private data: string[] = [];

  /**
   * Constructor.
   * @param userService User service
   * @param ordersService Orders service
   */
  constructor(
    private readonly userService: UserService,
    private readonly ordersService: OrdersService,
  ) {}

  /**
   * Indicates if user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.userService.getUser().token ? true : false;
  }

  /**
   * Returns current orders.
   */
  public orders(): any[] {
    return this.data;
  }

  /**
   * Gets user orders.
   */
  public getOrders(): void {
    const serviceModel: IUser = this.userService.getUser();
    this.ordersService.orders(this.mock, serviceModel.token || '$TOKEN').subscribe(
      (data: string[]) => {
        this.data = data;
        this.changeOrders();
      },
      (error: any) => {
        this.errorReport = error;
        setTimeout(() => {
          this.errorReport = '';
        }, 2500);
      },
    );
  }

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
    if (changes.mock) {
      this.getOrders();
    }
  }
}
