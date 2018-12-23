import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * @title Private orders index component
 */
@Component({
  selector: 'private-orders-index',
  templateUrl: './private-orders-index.component.html',
  styleUrls: ['./private-orders-index.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class PrivateOrdersIndexComponent implements OnInit, OnDestroy {

  /**
   * @param el Element reference
   */
  constructor(
    private el: ElementRef
  ) {}

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn' = 'primary';

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock: boolean = true;

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectServer(event: { mock: boolean }): void {
    this.mock = event.mock;
  }

  /**
   * Orders data change event handler.
   */
  public ordersChangeHandler(event: string[]): void {
    console.log('Private Orders index: ordersChangeHandler, event', event);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    console.log('PrivateOrdersIndexComponent component initialized');
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('PrivateOrdersIndexComponent component destroyed');
  }

}
