import { Component, EventEmitter, Input, Output } from '@angular/core';

import { fadeIn, fadeInOut } from '../animations';

import { UserService } from '../../../services/user/user.service';

/**
 * @title Passport index
 */
@Component({
  selector: 'passport-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100">
        {{title}}
      </span>
      <span fxFlex="100" fxLayout="row wrap" fxLayoutAlign="center center">
        <button mat-button *ngIf="isLoggedIn()" (click)="logout()">Logout</button>
        <button mat-button *ngIf="!isLoggedIn() && restrictMode !== 'login'" (click)="modeChange('login')">Login</button>
        <button mat-button *ngIf="!isLoggedIn() && restrictMode !== 'signup'" (click)="modeChange('signup')">Signup</button>
      </span>
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        instructions?
      </span>
      <span fxFlex="100" *ngIf="isLoggedIn()">
        <p>username: {{user().name}}</p>
        <p>email: {{user().email}}</p>
        <p>organization: {{user().organization}}</p>
      </span>
    </div>
  `,
  animations: [fadeIn, fadeInOut],
  host: {
    class: 'mat-body-1'
  }
})
export class PassportIndexComponent {

  /**
   * @param userService User service
   */
  constructor(
    private userService: UserService
  ) {}

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn';

  /**
   * UI title.
   */
  @Input() public title: string = 'Passport Index';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock: boolean = true;

  /**
   * Switches mode.
   */
  @Output() public switchMode: EventEmitter<string> = new EventEmitter();

  /**
   * Emits mode change event.
   * @param mode mode that should be activated by widget component.
   */
  public modeChange(mode: 'login'|'signup'): void {
    this.switchMode.emit(mode);
  }

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login'|'signup'|null = null;

  /**
   * Indicates if user is logged in.
   */
  public isLoggedIn(): boolean {
    return (this.userService.getUser().token) ? true : false;
  }

  /**
   * Returns current user object without token.
   */
  public user(): { name: string, email: string, organization: string } {
    const serviceModel: any = this.userService.getUser();
    let name: string;
    let email: string;
    let organization: string;
    ({ name, email, organization } = { name: serviceModel.name, email: serviceModel.email, organization: serviceModel.organization });
    return { name, email, organization };
  }

  /**
   * Logs user out.
   */
  public logout(): void {
    this.userService.ResetUser();
  }

}
