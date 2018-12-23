import { Injectable } from '@angular/core';

import { IUser } from '../../interfaces/index';

/**
 * @title User service
 */
@Injectable()
export class UserService {

  constructor() {
    this.initializeModel();
    if (!localStorage.getItem('userService') && typeof localStorage.getItem('userService') === 'undefined') {
      localStorage.setItem('userService', JSON.stringify(this.model));
    } else {
      this.RestoreUser();
    }
    console.log(' >> USER SERVICE CONSTRUCTOR, model', this.model);
  }

  /**
   * User service model.
   */
  private model: IUser = new IUser();

  /**
   * Initializes model.
   */
  private initializeModel(): void {
    this.model = new IUser();
  }

  /**
   * Retrieves user service model.
   */
  public getUser(): any {
    return this.model;
  }

  /**
   * Updates user service model with new values.
   * @param newValues new values object
   */
  public SaveUser(newValues: any): void {
    console.log('SaveUser', newValues);
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
  public RestoreUser(): void {
    if (localStorage.getItem('userService') && typeof localStorage.getItem('userService') !== 'undefined') {
      this.model = JSON.parse(localStorage.getItem('userService'));
    }
  }

  /**
   * Resets/initializes user service model.
   */
  public ResetUser(): void {
    this.model = new IUser();
    localStorage.setItem('userService', JSON.stringify(this.model));
    console.log('Reset User, localStorage.userService:', localStorage.getItem('userService'));
  }

}
