import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { concatMap, tap } from 'rxjs/operators';

import { AppUiState, themeUiActions } from './ui.store';

@Injectable({
  providedIn: 'root',
})
export class AppUiService {
  constructor(private readonly store: Store, private readonly overlayContainer: OverlayContainer) {}

  public readonly darkEnabled$ = this.store.select(AppUiState.getDarkThemeEnabled);

  public enableDarkTheme() {
    return this.store.dispatch(new themeUiActions.setUiState({ darkThemeEnabled: true })).pipe(
      tap(() => {
        this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
      }),
    );
  }

  public disableDarkTheme() {
    return this.store.dispatch(new themeUiActions.setUiState({ darkThemeEnabled: false })).pipe(
      tap(() => {
        this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
      }),
    );
  }

  public toggleMaterialTheme() {
    return this.store.selectOnce(AppUiState.getDarkThemeEnabled).pipe(
      concatMap(darkThemeEnabled => {
        const result = darkThemeEnabled ? this.disableDarkTheme() : this.enableDarkTheme();
        return result;
      }),
    );
  }
}
