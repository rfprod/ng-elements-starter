import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../services/user/user.service';

import { IUser } from '../../../interfaces/index';

/**
 * Catalogue widget component
 */
@Component({
  selector: 'catalogue-widget',
  templateUrl: './catalogue-widget.component.html',
  styleUrls: ['./catalogue-widget.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class CatalogueWidgetComponent implements OnInit {

  /**
   * Constructor.
   * @param userService Users service
   */
  constructor(
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
  public mock = true;

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
    this.userService.SaveUser(this.user);
  }

}
