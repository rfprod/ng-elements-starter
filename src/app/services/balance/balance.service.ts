/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WINDOW } from 'src/app/utils';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';

/**
 * Balance service
 * @description Polls server for balance data over http
 */
@Injectable()
export class BalanceService {
  /**
   * Endpoints object for making requests to the API.
   */
  private readonly endpoints = {
    balance: {
      mock: `${this.window.location.origin}/balance`,
      real: `${this.handlers.apiBaseUrl()}/balance`,
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
   * Returns user balance.
   * @param mock indicates that mocked backend should be used
   * @param token user token
   */
  public balance(mock: boolean, token: string): Observable<any> {
    const endpoint: string = mock ? this.endpoints.balance.mock : this.endpoints.balance.real;
    const observable: Observable<any> = this.http.get(`${endpoint}?token=${token}`);
    return this.handlers.pipeRequestWithObjectResponse(observable);
  }
}
