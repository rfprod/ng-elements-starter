import { Component, ElementRef, HostListener, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { fadeIn, fadeInOut } from '../animations';

import { UserService } from '../../../services/user/user.service';

import { IServerChangeEvent } from '../../../interfaces/index';

/**
 * @title Passport widget component
 */
@Component({
  selector: 'passport-widget',
  templateUrl: './passport-widget.component.html',
  styleUrls: ['./passport-widget.component.css'],
  animations: [fadeInOut, fadeIn],
  host: {
    class: 'mat-body-1'
  }
})
export class PassportWidgetComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * @param el Element reference
   * @param userService Users service
   */
  constructor(
    private el: ElementRef,
    private userService: UserService
  ) {}

  /**
   * Indicates if user is anonymous, i.e. token is not present in UserService.
   */
  public anonUser(): boolean {
    return (this.userService.getUser().token) ? false : true;
  }

  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * UI mode state.
   */
  private mode: {
    index: boolean,
    login: boolean,
    signup: boolean
  } = {
    index: true,
    login: false,
    signup: false
  };

  /**
   * Currently activated mode.
   */
  @Input() public activatedMode: 'index'|'login'|'signup' = 'index';

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login'|'signup'|null = null;

  /**
   * Indicated if passport config should be displayed.
   */
  @Input() public displayConfig: boolean = true;

  /**
   * Resolves if mode is restricted or not.
   * @param modeKey mode key that should be chedked for restriction
   */
  public isRestricted(modeKey: 'index'|'login'|'signup'): boolean {
    return this.restrictMode && this.restrictMode === modeKey;
  }

  /**
   * Resolves if mode is current.
   * @param modeKey mode that should be checked for activateion state
   */
  public isCurrentMode(modeKey: 'index'|'login'|'signup'): boolean {
    return modeKey == this.activatedMode;
  }

  /**
   * Returns component start mode key.
   */
  private getStartModeKey(): 'index'|'login'|'signup' {
    let key: 'index'|'login'|'signup' = 'index';
    if (this.isRestricted('signup')) {
      key = (this.userService.getUser().token) ? 'index' : 'login';
    } else if (this.isRestricted('login')) {
      key = 'signup';
    }
    return key;
  }

  /**
   * Activates a particular UI mode.
   * Deactivates current UI mode first.
   * @param modeKey mode key that should be activated
   */
  public activateMode(modeKey: 'index'|'login'|'signup'): void {
    if (this.userService.getUser().token) { // override modeKey, load index view for authenticated users
      modeKey = 'index';
    }
    if (!this.isRestricted(modeKey)) {
      this.mode[this.activatedMode] = !this.mode[this.activatedMode];
      this.mode[modeKey] = !this.mode[modeKey];
      this.activatedMode = modeKey;
    }
  }

  /**
   * Indicates if mocked server should be used.
   */
  @Input() public mock: boolean = true;

  /**
   * Selects real or mocked server., used in config callback.
   * @param event server change event
   */
  public selectServer(event: IServerChangeEvent): void {
    this.mock = event.mock;
  }

  /**
   * Document keypress host listener.
   * @param event keyboard event
   */
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('handleKeyboardEvent, event', event);
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

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    console.log('Passport widget initialized');
    this.activateMode(this.getStartModeKey());
  }

  /**
   * Lifecycle hook called on component input changes.
   * @param changes input changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    console.log('Passport widget input change', changes);
    if ('mock' in changes) {
      const mock = changes.mock.currentValue;
      this.selectServer({ mock });
    }
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('Passport widget destroyed');
  }

}
