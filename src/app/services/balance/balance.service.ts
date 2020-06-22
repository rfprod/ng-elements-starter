import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppBalance } from 'src/app/interfaces';
import { WINDOW } from 'src/app/utils';

import { AppHttpHandlersService } from '../http-handlers/http-handlers.service';

/**
 * Balance service
 * @description Polls server for balance data over http
 */
@Injectable({
  providedIn: 'root',
})
export class AppBalanceService {
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
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly window: Window,
  ) {}

  /**
   * Returns user balance.
   * @param mock indicates that mocked backend should be used
   * @param token user token
   */
  public balance(mock: boolean, token: string): Observable<AppBalance> {
    const endpoint: string = mock ? this.endpoints.balance.mock : this.endpoints.balance.real;
    const observable = this.http.get<AppBalance>(`${endpoint}?token=${token}`);
    return this.handlers.pipeHttpRequest<AppBalance>(observable);
  }
}
