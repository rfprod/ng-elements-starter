import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, take, timeout } from 'rxjs/operators';
import { EHTTP_STATUS } from 'src/app/interfaces/http-statuses.interface';
import { ETIMEOUT, WINDOW } from 'src/app/utils';

import { AppUserService } from '../user/user.service';

/**
 * Custom http handers
 *
 * @description Handles http requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpHandlersService {
  /**
   * Default timeout interval for http-requests.
   */
  public readonly defaultHttpTimeout = 10000;

  /**
   * Constructor.
   *
   * @param userService User service - browser local storage wrapper which stores user creadentials
   * @param snackBar Error toaster
   * @param window window reference
   */
  constructor(
    private readonly userService: AppUserService,
    private readonly snackBar: MatSnackBar,
    @Inject(WINDOW) private readonly window: Window,
  ) {}

  /**
   * Resolves if app is running on localhost.
   */
  public isLocalhost(): boolean {
    return this.window.location.origin.includes('localhost');
  }

  /**
   * Resolves real server API base url, adds correct protocol.
   */
  public apiBaseUrl(): string {
    return `${this.window.location.protocol}/real-server-domain.tld`;
  }

  /**
   * Check error status, and redirects to /login if status is 403.
   * Note on errors:
   * 401 - unauthorized token expired
   * 403 - forbidden, no access rights
   */
  public checkErrorStatusAndRedirect(status: EHTTP_STATUS): void {
    if (status === EHTTP_STATUS.UNAUTHORIZED) {
      /*
       * Reset token first or user will be redirected by router to profile.
       */
      this.userService.saveUser({ token: '' });
    }
  }

  private displayErrorToast(error: string): void {
    this.snackBar.open(error, void 0, {
      duration: ETIMEOUT.MEDUIM,
    });
  }

  public getErrorMessage(error: HttpErrorResponse): string {
    const msg: string = Boolean(error.message) ? error.message : error.error;
    const errorMessage: string = Boolean(msg)
      ? msg
      : Boolean(error.status)
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    return errorMessage;
  }

  /**
   * Handles error.
   *
   * @param error error object
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    this.displayErrorToast(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * Pipes request with object response.
   *
   * @param observable request observable
   */
  public pipeHttpRequest<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      take(1),
      catchError(error => this.handleError(error)),
    );
  }
}
