import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppUser, IUserDto } from '../../interfaces/index';

/**
 * User service
 *
 * @description Is a wrapper around browser local storage
 */
@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  private readonly user = new BehaviorSubject<AppUser>(new AppUser());

  public readonly user$ = this.user.asObservable();

  public readonly userToken$ = this.user$.pipe(map(user => user.token));

  public readonly isLoggedIn$ = this.user$.pipe(map(user => Boolean(user.token)));

  constructor() {
    this.initializeModel();
    this.checkLocalStorageAndRestoreUser();
  }

  /**
   * Updates user service model with new values.
   *
   * @param newValues new values object
   */
  public saveUser(newValues: IUserDto): void {
    const user = { ...this.user.value };
    if (typeof newValues.name !== 'undefined') {
      user.name = newValues.name;
    }
    if (typeof newValues.email !== 'undefined') {
      user.email = newValues.email;
    }
    if (typeof newValues.organization !== 'undefined') {
      user.organization = newValues.organization;
    }
    if (typeof newValues.token !== 'undefined') {
      user.token = newValues.token;
    }
    localStorage.setItem('userService', JSON.stringify(user));
    this.user.next(user);
  }

  /**
   * Restores user service model.
   */
  public restoreUser(): void {
    const userServiceModel = localStorage.getItem('userService');
    if (userServiceModel !== null) {
      const user = JSON.parse(userServiceModel);
      this.user.next(user);
    }
  }

  /**
   * Resets/initializes user service model.
   */
  public resetUser(): void {
    const user = new AppUser();
    localStorage.setItem('userService', JSON.stringify(user));
    this.user.next(user);
  }

  /**
   * Initializes model.
   */
  private initializeModel(): void {
    const user = new AppUser();
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
