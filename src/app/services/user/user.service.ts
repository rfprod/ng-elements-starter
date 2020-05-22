import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser, IUserDto } from '../../interfaces/index';

/**
 * User service
 * @description Is a wrapper around browser local storage
 */
@Injectable()
export class UserService {
  private readonly user = new BehaviorSubject<IUser>(new IUser());

  public readonly user$ = this.user.asObservable();

  public readonly userToken$ = this.user$.pipe(map(user => user.token));

  public readonly isLoggedIn$ = this.user$.pipe(map(user => Boolean(user.token)));

  constructor() {
    this.initializeModel();
    this.checkLocalStorageAndRestoreUser();
  }

  /**
   * Updates user service model with new values.
   * @param newValues new values object
   */
  public saveUser(newValues: IUserDto): void {
    const user = { ...this.user.value };
    if (newValues.hasOwnProperty('name')) {
      user.name = newValues.name;
    }
    if (newValues.hasOwnProperty('email')) {
      user.email = newValues.email;
    }
    if (newValues.hasOwnProperty('organization')) {
      user.organization = newValues.organization;
    }
    if (newValues.hasOwnProperty('token')) {
      user.token = newValues.token;
    }
    localStorage.setItem('userService', JSON.stringify(user));
    this.user.next(user);
  }

  /**
   * Restores user service model.
   */
  public restoreUser(): void {
    if (
      Boolean(localStorage.getItem('userService')) &&
      typeof localStorage.getItem('userService') !== 'undefined'
    ) {
      const user = JSON.parse(localStorage.getItem('userService'));
      this.user.next(user);
    }
  }

  /**
   * Resets/initializes user service model.
   */
  public resetUser(): void {
    const user = new IUser();
    localStorage.setItem('userService', JSON.stringify(user));
    this.user.next(user);
  }

  /**
   * Initializes model.
   */
  private initializeModel(): void {
    const user = new IUser();
    this.user.next(user);
  }

  /**
   * Check if local storage contains user data, and restore if it exists.
   */
  private checkLocalStorageAndRestoreUser() {
    if (
      !Boolean(localStorage.getItem('userService')) &&
      typeof localStorage.getItem('userService') === 'undefined'
    ) {
      localStorage.setItem('userService', JSON.stringify(this.user.value));
    } else {
      this.restoreUser();
    }
  }
}
