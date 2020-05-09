import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UiService } from 'src/app/state/theme/ui.service';
import { UiState } from 'src/app/state/theme/ui.store';

/**
 * Application index component
 * @description Includes element modules
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss'],
  host: {
    class: 'mat-body-1',
  },
})
export class AppIndexComponent {
  /**
   * Component theme color.
   */
  public theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * Defines if UI should use alternative dark material theme.
   */
  @HostBinding('class.unicorn-dark-theme') public darkTheme = false;

  /**
   * Asyncronous material theme state.
   */
  public readonly darkTheme$ = this.store.select(UiState.getDarkThemeEnabled).pipe(
    tap(darkThemeEnabled => {
      this.darkTheme = darkThemeEnabled;
    }),
  );

  constructor(public readonly store: Store, private readonly uiService: UiService) {}

  /**
   * Toggles application material theme.
   */
  public toggleMaterialTheme(event?: Event): void {
    if (event) {
      void this.uiService.toggleMaterialTheme().subscribe();
    }
  }
}
