import { Injectable } from '@angular/core';

import { IUser, IUserDto } from '../../interfaces/index';

/**
 * User service
 * @description Is a wrapper around browser local storage
 */
@Injectable()
export class UserService {
  /**
   * User service model.
   */
  private model: IUser = new IUser();
  /**
   * Constructor.
   */
  constructor() {
    this.initializeModel();
    if (
      !Boolean(localStorage.getItem('userService')) &&
      typeof localStorage.getItem('userService') === 'undefined'
    ) {
      localStorage.setItem('userService', JSON.stringify(this.model));
    } else {
      this.restoreUser();
    }
  }

  /**
   * Retrieves user service model.
   */
  public getUser(): IUser {
    return this.model;
  }

  /**
   * Updates user service model with new values.
   * @param newValues new values object
   */
  public saveUser(newValues: IUserDto): void {
    if (newValues.hasOwnProperty('name')) {
      this.model.name = newValues.name;
    }
    if (newValues.hasOwnProperty('email')) {
      this.model.email = newValues.email;
    }
    if (newValues.hasOwnProperty('organization')) {
      this.model.organization = newValues.organization;
    }
    if (newValues.hasOwnProperty('token')) {
      this.model.token = newValues.token;
    }
    localStorage.setItem('userService', JSON.stringify(this.model));
  }

  /**
   * Restores user service model.
   */
  public restoreUser(): void {
    if (
      Boolean(localStorage.getItem('userService')) &&
      typeof localStorage.getItem('userService') !== 'undefined'
    ) {
      this.model = JSON.parse(localStorage.getItem('userService'));
    }
  }

  /**
   * Resets/initializes user service model.
   */
  public resetUser(): void {
    this.model = new IUser();
    localStorage.setItem('userService', JSON.stringify(this.model));
  }

  /**
   * Initializes model.
   */
  private initializeModel(): void {
    this.model = new IUser();
  }

  /**
   * Indicats if user is logged in.
   */
  public isLoggedIn(): boolean {
    return Boolean(this.getUser().token);
  }
}
