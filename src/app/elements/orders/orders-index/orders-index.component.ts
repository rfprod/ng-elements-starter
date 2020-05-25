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

import { IOrder } from '../../../interfaces/index';
import { OrdersService } from '../../../services/orders/orders.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Orders index
 */
@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.scss'],
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

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(
    private readonly userService: UserService,
    private readonly ordersService: OrdersService,
  ) {}

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
    void this.userService.userToken$
      .pipe(
        filter(token => Boolean(token)),
        first(),
        concatMap(token => this.ordersService.orders(this.mock, token)),
      )
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
