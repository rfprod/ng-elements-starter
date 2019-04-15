import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';

import { Observable } from 'rxjs';

/**
 * @title Balance service
 * @description Polls server for balance data over http
 */
@Injectable()
export class BalanceService {

  /**
   * @param http Http client
   * @param handlers Custom http handlers service
   * @param window Window - window reference
   */
  constructor(
    private http: HttpClient,
    private handlers: CustomHttpHandlersService,
    @Inject('Window') private window: Window
  ) {}

  /**
   * Endpoints object for making requests to the API.
   */
  private endpoints: any = {
    balance: {
      mock: this.window.location.origin + '/balance' as string,
      real: this.handlers.apiBaseUrl() + '/balance' as string
    }
  };

  /**
   * Returns user balance.
   * @param mock indicates that mocked backend should be used
   * @param token user token
   */
  public balance(mock: boolean, token: string): Observable<any> {
    const endpoint: string = mock ? this.endpoints.balance.mock : this.endpoints.balance.real;
    const observable: Observable<any> = this.http.get(endpoint + `?token=${token}`);
    return this.handlers.pipeRequestWithObjectResponse(observable);
  }

}
