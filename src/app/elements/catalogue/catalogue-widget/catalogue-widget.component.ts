import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser } from '../../../interfaces/index';

/**
 * @title Catalogue widget component
 */
@Component({
  selector: 'catalogue-widget',
  templateUrl: './catalogue-widget.component.html',
  styleUrls: ['./catalogue-widget.component.css'],
  host: {
		class: 'mat-body-1'
	}
})
export class CatalogueWidgetComponent implements OnInit, OnDestroy {

  /**
   * @param el Element reference
   * @param userService Users service
   */
  constructor(
    private el: ElementRef,
    private userService: UserService
  ) {}

  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * User object.
   */
  @Input() public user: IUser = new IUser();

  /**
   * Indicates if mocked server should be used.
   */
  public mock: boolean = true;

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectServer(event: { mock: boolean }): void {
    this.mock = event.mock;
  }

  /**
   * Catalogue data change event handler.
   */
  public catalogueChangeHandler(event: string[]): void {
    console.log('Catalogue widget: catalogueChangeHandler, event', event);
  }

  public ngOnInit(): void {
    console.log('Catalogue widget initialized');
    this.userService.SaveUser(this.user);
  }

  public ngOnDestroy(): void {
    console.log('Catalogue widget destroyed');
  }

}
