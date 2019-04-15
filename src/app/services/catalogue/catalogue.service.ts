import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CustomHttpHandlersService } from '../http-handlers/custom-http-handlers.service';

import { Observable } from 'rxjs';

/**
 * @title Catalogue service
 * @description Polls server for catalogue data over http
 */
@Injectable()
export class CatalogueService {

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
    catalogue: {
      mock: this.window.location.origin + '/catalogue' as string,
      real: this.handlers.apiBaseUrl() + '/catalog' as string
    }
  };

  /**
   * Returns user catalogue.
   * @param mock indicates that mocked backend should be used
   * @param token user token
   */
  public catalogue(mock: boolean, token: string): Observable<any> {
    const endpoint: string = mock ? this.endpoints.catalogue.mock : this.endpoints.catalogue.real;
    const observable: Observable<any> = this.http.get(endpoint + `?token=${token}`);
    return this.handlers.pipeRequestWithArrayResponse(observable);
  }

}
