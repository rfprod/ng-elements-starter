import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { concatMap, tap } from 'rxjs/operators';

import { themeUiActions, UiState } from './ui.store';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private readonly store: Store, private readonly overlayContainer: OverlayContainer) {}

  public readonly darkEnabled$ = this.store.select(UiState.getDarkThemeEnabled);

  public enableDarkTheme() {
    return this.store.dispatch(new themeUiActions.setUiState({ darkThemeEnabled: true })).pipe(
      tap(_ => {
        this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
      }),
    );
  }

  public disableDarkTheme() {
    return this.store.dispatch(new themeUiActions.setUiState({ darkThemeEnabled: false })).pipe(
      tap(_ => {
        this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
      }),
    );
  }

  public toggleMaterialTheme() {
    return this.store.selectOnce(UiState.getDarkThemeEnabled).pipe(
      concatMap(darkThemeEnabled => {
        return darkThemeEnabled ? this.disableDarkTheme() : this.enableDarkTheme();
      }),
    );
  }
}
