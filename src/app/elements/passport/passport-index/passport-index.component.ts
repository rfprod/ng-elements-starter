import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../../services/user/user.service';
import { fadeIn, fadeInOut } from '../animations';

/**
 * Passport index
 */
@Component({
  selector: 'app-passport-index',
  templateUrl: './passport-index.component.html',
  styleUrls: ['./passport-index.component.scss'],
  animations: [fadeIn, fadeInOut],
})
export class PassportIndexComponent {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * UI title.
   */
  @Input() public title = 'Passport Index';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login' | 'signup' | null = null;

  /**
   * Switches mode.
   */
  @Output() public switchMode: EventEmitter<string> = new EventEmitter();

  /**
   * Returns current user object without token.
   */
  public readonly user$: Observable<{
    name: string;
    email: string;
    organization: string;
  }> = this.userService.user$.pipe(
    map(user => {
      const name: string = user.name;
      const email: string = user.email;
      const organization: string = user.organization;
      return { name, email, organization };
    }),
  );

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(private readonly userService: UserService) {}

  /**
   * Emits mode change event.
   * @param mode mode that should be activated by widget component.
   */
  public modeChange(mode: 'login' | 'signup'): void {
    this.switchMode.emit(mode);
  }

  /**
   * Logs user out.
   */
  public logout(): void {
    this.userService.resetUser();
  }
}
