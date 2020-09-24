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

import { AppOrder, IThemeColorChange } from '../../../interfaces/index';
import { AppOrdersService } from '../../../services/orders/orders.service';
import { AppUserService } from '../../../services/user/user.service';

/**
 * Orders index
 */
@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOrdersIndexComponent implements OnInit, OnChanges {
  /**
   * Component theme.
   */
  @Input() public theme: IThemeColorChange['theme'] = 'primary';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Orders change event emitter.
   */
  @Output() public readonly ordersChange: EventEmitter<AppOrder[]> = new EventEmitter();

  /**
   * Orders data.
   */
  private data: AppOrder[] = [];

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(
    private readonly userService: AppUserService,
    private readonly ordersService: AppOrdersService,
  ) {}

  /**
   * Returns current orders.
   */
  public orders(): AppOrder[] {
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
        (data: AppOrder[]) => {
          this.data = data;
          this.changeOrders();
        },
        () => null,
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
    if (Boolean(changes.mock)) {
      this.getOrders();
    }
  }
}
