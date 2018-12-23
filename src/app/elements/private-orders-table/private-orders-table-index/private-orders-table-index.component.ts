import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * @title Private orders table index component
 */
@Component({
  selector: 'private-orders-table-index',
  templateUrl: './private-orders-table-index.component.html',
  styleUrls: ['./private-orders-table-index.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class PrivateOrdersTableIndexComponent implements OnInit, OnDestroy {

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
    console.log('Private Orders Table index: ordersChangeHandler, event', event);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    console.log('PrivateOrdersTableIndexComponent component initialized');
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('PrivateOrdersTableIndexComponent component destroyed');
  }

}
