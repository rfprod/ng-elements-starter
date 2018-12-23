import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';

import { Observable } from 'rxjs';

/**
 * @title Orders service
 */
@Injectable()
export class OrdersService {

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
    orders: {
      mock: this.window.location.origin + '/orders' as string,
      real: this.handlers.apiBaseUrl() + '/orders' as string
    }
  };

  /**
   * Returns user balance.
   * @param mock indicates that mocked backend should be used
   * @param token user token
   */
  public orders(mock: boolean, token: string): Observable<any> {
    const endpoint: string = mock ? this.endpoints.orders.mock : this.endpoints.orders.real;
    const observable: Observable<any> = this.http.get(endpoint + `?token=${token}`);
    return this.handlers.pipeRequestWithArrayResponse(observable);
  }

}
