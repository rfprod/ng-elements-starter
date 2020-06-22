import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TCatalog } from 'src/app/interfaces/catalog.interface';
import { WINDOW } from 'src/app/utils';

import { AppHttpHandlersService } from '../http-handlers/http-handlers.service';

/**
 * Catalog service
 * @description Polls server for catalog data over http
 */
@Injectable({
  providedIn: 'root',
})
export class AppCatalogService {
  /**
   * Endpoints object for making requests to the API.
   */
  private readonly endpoints = {
    catalog: {
      mock: `${this.window.location.origin}/catalog`,
      real: `${this.handlers.apiBaseUrl()}/catalog`,
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
   * Returns user catalog.
   * @param mock indicates that mocked backend should be used
   * @param token user token
   */
  public catalog(mock: boolean, token: string): Observable<TCatalog> {
    const endpoint: string = mock ? this.endpoints.catalog.mock : this.endpoints.catalog.real;
    const observable = this.http.get<TCatalog>(`${endpoint}?token=${token}`);
    return this.handlers.pipeHttpRequest<TCatalog>(observable);
  }
}
