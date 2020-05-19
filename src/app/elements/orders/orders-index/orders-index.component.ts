import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { IOrder, IUser } from '../../../interfaces/index';
import { OrdersService } from '../../../services/orders/orders.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Orders index
 */
@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
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
   * Orders change event emitter.
   */
  @Output() public ordersChange: EventEmitter<IOrder[]> = new EventEmitter();

  /**
   * Orders data.
   */
  private data: IOrder[] = [];

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
    return this.userService.isLoggedIn();
  }

  /**
   * Returns current orders.
   */
  public orders(): IOrder[] {
    return this.data;
  }

  /**
   * Gets user orders.
   */
  public getOrders() {
    const serviceModel: IUser = this.userService.getUser();
    void this.ordersService
      .orders(this.mock, Boolean(serviceModel.token) ? serviceModel.token : '$TOKEN')
      .subscribe(
        (data: IOrder[]) => {
          this.data = data;
          this.changeOrders();
        },
        _ => null,
      );
  }

  /**
   * Emits orders data change event.
   */
  public changeOrders(): void {
    this.ordersChange.emit(this.data);
  }

  public ngOnInit(): void {
    this.getOrders();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mock) {
      this.getOrders();
    }
  }
}
