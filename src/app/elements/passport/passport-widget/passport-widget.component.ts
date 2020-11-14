import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { IServerChangeEvent } from '../../../interfaces/index';
import { AppUserService } from '../../../services/user/user.service';
import { fadeIn, fadeInOut } from '../animations';

/**
 * Passport widget component
 */
@Component({
  selector: 'app-passport-widget',
  templateUrl: './passport-widget.component.html',
  styleUrls: ['./passport-widget.component.scss'],
  animations: [fadeInOut, fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPassportWidgetComponent implements OnInit, OnChanges {
  /**
   * Currently activated mode.
   */
  @Input() public activatedMode: 'index' | 'login' | 'signup' = 'index';

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login' | 'signup' | null = null;

  /**
   * Indicated if passport config should be displayed.
   */
  @Input() public displayConfig = true;

  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock = true;

  /**
   * Server change output.
   */
  @Output() public readonly serverChange = new EventEmitter<{ mock: boolean }>();

  /**
   * UI mode state.
   */
  private readonly mode: {
    index: boolean;
    login: boolean;
    signup: boolean;
  } = {
    index: true,
    login: false,
    signup: false,
  };

  /**
   * Returns component start mode key.
   */
  private readonly getStartModeKey$: Observable<
    'index' | 'login' | 'signup'
  > = this.userService.isLoggedIn$.pipe(
    first(),
    map(result => {
      let key: 'index' | 'login' | 'signup' = 'index';
      if (this.isRestricted('signup')) {
        key = result ? 'index' : 'login';
      } else if (this.isRestricted('login')) {
        key = 'signup';
      }
      return key;
    }),
  );

  constructor(private readonly userService: AppUserService) {}

  /**
   * Resolves if mode is restricted or not.
   *
   * @param modeKey mode key that should be chedked for restriction
   */
  public isRestricted(modeKey: 'index' | 'login' | 'signup'): boolean {
    return Boolean(this.restrictMode) && this.restrictMode === modeKey;
  }

  /**
   * Resolves if mode is current.
   *
   * @param modeKey mode that should be checked for activateion state
   */
  public isCurrentMode(modeKey: 'index' | 'login' | 'signup'): boolean {
    return modeKey === this.activatedMode;
  }

  /**
   * Activates a particular UI mode.
   * Deactivates current UI mode first.
   *
   * @param modeKey mode key that should be activated
   */
  public activateMode(modeKey: 'index' | 'login' | 'signup'): void {
    void this.userService.isLoggedIn$
      .pipe(
        first(),
        tap(result => {
          let key = modeKey;
          if (result) {
            // Override modeKey, load index view for authenticated users
            key = 'index';
          }
          if (!this.isRestricted(key)) {
            this.mode[this.activatedMode] = !this.mode[this.activatedMode];
            this.mode[key] = !this.mode[key];
            this.activatedMode = key;
          }
        }),
      )
      .subscribe();
  }

  /**
   * Selects real or mocked server., used in config callback.
   *
   * @param event server change event
   */
  public selectServer(event: IServerChangeEvent): void {
    const mock = event.mock;
    this.mock = mock;
    this.serverChange.emit({ mock });
  }

  /**
   * Document keypress host listener.
   *
   * @param event keyboard event
   */
  @HostListener('document:keypress', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key === 'I') {
      event.preventDefault();
      this.activateMode('index');
    }
    if (event.shiftKey && event.key === 'L') {
      event.preventDefault();
      this.activateMode('login');
    }
    if (event.shiftKey && event.key === 'S') {
      event.preventDefault();
      this.activateMode('signup');
    }
  }

  public ngOnInit(): void {
    void this.getStartModeKey$
      .pipe(
        tap(key => {
          this.activateMode(key);
        }),
      )
      .subscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('mock' in changes) {
      const mock = changes.mock.currentValue;
      this.selectServer({ mock });
      this.serverChange.emit({ mock });
    }
  }
}
