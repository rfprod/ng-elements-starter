/**
 * User interface.
 */
export class IUser {
  public name = '';
  public email = '';
  public organization = '';
  public token = '';
}

/**
 * User interface.
 */
export interface IUserDto {
  name?: string;
  email?: string;
  organization?: string;
  token?: string;
}
