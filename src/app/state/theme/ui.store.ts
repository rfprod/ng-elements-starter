import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { setUiState } from './ui.actions';
import { IUiStateModel, UiPayload } from './ui.interface';

const themeUiActions = {
  setUiState,
};

@State<IUiStateModel>({
  name: 'ui',
  defaults: {
    darkThemeEnabled: false,
  },
})
@Injectable()
class UiState {
  @Selector()
  public static getUi(state: IUiStateModel) {
    return state;
  }

  @Selector()
  public static getDarkThemeEnabled(state: IUiStateModel) {
    return state.darkThemeEnabled;
  }

  @Action(setUiState)
  public setUiState(ctx: StateContext<IUiStateModel>, { payload }: UiPayload) {
    return ctx.patchState(payload);
  }
}

export { UiState, themeUiActions };
