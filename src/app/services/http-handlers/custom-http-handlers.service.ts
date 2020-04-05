import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, concat, throwError } from 'rxjs';
import { catchError, map, take, timeout } from 'rxjs/operators';
import { ESERVER_RESPONSE_CODE, WINDOW } from 'src/app/utils';
import { UserService } from '../user/user.service';

/**
 * Custom http handers
 * @description Handles http requests.
 */
@Injectable()
export class CustomHttpHandlersService {
  /**
   * Default timeout interval for http-requests.
   */
  public defaultHttpTimeout = 10000;

  /**
   * Constructor.
   * @param userService User service - browser local storage wrapper which stores user creadentials
   * @param window window reference
   */
  constructor(
    private readonly userService: UserService,
    @Inject(WINDOW) private readonly window: Window,
  ) {}

  /**
   * Resolves if app is running on localhost.
   */
  public isLocalhost(): boolean {
    return this.window.location.origin.indexOf('localhost') !== -1;
  }

  /**
   * Resolves real server API base url, adds correct protocol.
   */
  public apiBaseUrl(): string {
    return `${this.window.location.protocol}/real-server-domain.tld`;
  }

  /**
   * Extracts response in format { val1: {}, val2: '' }.
   * @param res http response, either extracted (body in json) or http response that should be parsed
   */
  public extractObject(res: any): object {
    return !res ? {} : typeof res.json === 'function' ? res.json() || {} : res || {};
  }

  /**
   * Extracts response in format { data: [ {}, {}, {} ] }.
   * @param res http response, either extracted (body in json) or http response that should be parsed
   */
  public extractArray(res: any): any[] {
    return !res ? [] : typeof res.json === 'function' ? res.json().data || [] : res.data || [];
  }

  /**
   * Extracts HttpResponse.
   */
  public extractHttpResponse(res: HttpResponse<any>): any {
    return res.body;
  }

  /**
   * Check error status, and redirects to /login if status is 403.
   * Note on errors:
   * 401 - unauthorized token expired
   * 403 - forbidden, no access rights
   */
  public checkErrorStatusAndRedirect(status: any): void {
    if (status === ESERVER_RESPONSE_CODE.UNAUTHORIZED) {
      /*
       * Reset token first or user will be redirected by router to profile.
       */
      this.userService.SaveUser({ token: '' });
    }
  }

  /**
   * Parses error response in the following format
   * { _body: "{ errors: [ { code: 'c', detail: 'd' } ] }" } where _body is a string
   * or
   * { _body: "{ code: 'c', message: 'm', detail: { inn: ['Invalid inn'] } }" } where _body is a string.
   * @param error error object
   */
  public handleError(error: any): Observable<any> {
    let msg: string;
    let errors: any;
    if (typeof error._body === 'string' && error._body !== 'null') {
      // Unwrap body
      error._body = JSON.parse(error._body);
      errors = error._body.errors
        ? error._body.errors
        : error._body.code && error._body.message
        ? error._body
        : null;
    }
    errors = !errors && error.errors ? error.errors : error.code && error.message ? error : errors;
    if (errors) {
      if (Array.isArray(errors)) {
        /*
         *	Parse errors as array.
         *	{ errors: [ { code: 'c', detail: 'd' } ] }
         */
        if (errors.length) {
          const e = errors[0]; // Grab only first error
          msg = e.code && e.detail ? `${e.code} - ${e.detail}` : null;
        }
      } else {
        /*
         *	Parse errors as object.
         *	{ code: 'c', message: 'm', detail: { inn: ['Invalid inn'] } }
         */
        let errDetail = '';
        if (errors.detail && typeof errors.detail === 'object') {
          /*
           *	Unwrap nested structure for errors.detail first, it must be flat.
           */
          for (const key in errors.detail) {
            if (errors.detail[key]) {
              if (!Array.isArray(errors.detail[key]) && typeof errors.detail[key] === 'object') {
                for (const subkey in errors.detail[key]) {
                  if (errors.detail[key][subkey]) {
                    errors.detail[subkey] = errors.detail[key][subkey];
                  }
                }
                delete errors.detail[key];
              }
            }
          }
          /*
           *	Now parse it.
           */
          for (const key in errors.detail) {
            if (errors.detail[key]) {
              errDetail += `${key} - ${errors.detail[key].join(', ')} `;
            }
          }
          errDetail = errDetail.trim();
        }
        msg = errDetail
          ? `${errors.code} - ${errors.message}: ${errDetail}`
          : `${errors.code} - ${errors.message}`;
      }
    }
    /*
     *	Parse error response - fallback.
     *	{ status: '400', statusText: 'Bad request' }
     */
    const errMsg: string = msg
      ? msg
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    return concat(throwError(errMsg));
  }

  /**
   * Pipes request with object response.
   * @param observable request observable
   */
  public pipeRequestWithObjectResponse(observable: Observable<any>) {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      take(1),
      map(data => this.extractObject(data)),
      catchError(error => this.handleError(error)),
    );
  }

  /**
   * Pipes request with object response.
   * @param observable request observable
   */
  public pipeRequestWithArrayResponse(observable: Observable<any>) {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      take(1),
      map(data => this.extractArray(data)),
      catchError(error => this.handleError(error)),
    );
  }
}
