import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppOrder } from 'src/app/interfaces';
import { WINDOW } from 'src/app/utils';

import { AppHttpHandlersService } from '../http-handlers/http-handlers.service';

/**
 * Orders service
 * @description Polls server for orders data over http
 */
@Injectable({
  providedIn: 'root',
})
export class AppOrdersService {
  /**
   * Endpoints object for making requests to the API.
   */
  private readonly endpoints = {
    orders: {
      mock: `${this.window.location.origin}/orders`,
      real: `${this.handlers.apiBaseUrl()}/orders`,
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
  public orders(mock: boolean, token: string): Observable<AppOrder[]> {
    const endpoint: string = mock ? this.endpoints.orders.mock : this.endpoints.orders.real;
    const observable = this.http.get<AppOrder[]>(`${endpoint}?token=${token}`);
    return this.handlers.pipeHttpRequest<AppOrder[]>(observable);
  }
}
