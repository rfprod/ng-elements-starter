/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WINDOW } from 'src/app/utils';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';

/**
 * Auth service
 * @description Sends authentication requests with user credentials to server over http
 */
@Injectable()
export class AuthService {
  /**
   * Endpoints object for making requests to the API.
   */
  private readonly endpoints = {
    login: {
      mock: `${this.window.location.origin}/login`,
      real: `${this.handlers.apiBaseUrl()}/auth`,
    },
    signup: {
      mock: `${this.window.location.origin}/signup`,
      real: `${this.handlers.apiBaseUrl()}/register`,
    },
  };
  /**
   * Constructor.
   * @param http Http client
   * @param handlers Custom http handlers service
   * @param window Window - window reference
   */
  constructor(
    private readonly http: HttpClient,
    private readonly handlers: CustomHttpHandlersService,
    @Inject(WINDOW) private readonly window: Window,
  ) {}

  /**
   * Loggs user in using email + password.
   * @param mock indicates that mocked backend should be used
   * @param email user email
   * @param pass user password
   */
  public login(mock: boolean, email: string, password: string): Observable<any> {
    const endpoint: string = mock ? this.endpoints.login.mock : this.endpoints.login.real;
    const formData: { email: string; password: string } = {
      email,
      password,
    };
    const observable: Observable<any> = this.http.post(endpoint, formData);
    return this.handlers.pipeRequestWithObjectResponse(observable);
  }

  /**
   * Signs user up.
   * @param mock indicates that mocked backend should be used
   * @param name user name
   * @param email user email
   * @param password user password
   * @param organization user organization
   */
  public signup(
    mock: boolean,
    email: string,
    password: string,
    organization: string,
    name: string,
  ): Observable<any> {
    const endpoint: string = mock ? this.endpoints.signup.mock : this.endpoints.signup.real;
    const formData: { name: string; email: string; password: string; organization: string } = {
      name,
      email,
      password,
      organization,
    };
    const observable: Observable<any> = this.http.post(endpoint, formData);
    return this.handlers.pipeRequestWithObjectResponse(observable);
  }
}
