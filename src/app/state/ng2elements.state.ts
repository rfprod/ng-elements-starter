import { Action, State, StateContext } from '@ngxs/store';
import { NgElementsStarterAction } from './ng2elements.actions';
import { NgElementsStarterStateModel } from './ng2elements.state.model';

/**
 * NgElementsStarter state.
 */
@State<NgElementsStarterStateModel>({
  name: 'ngElementsStarter',
  defaults: {
    theme: null,
  },
})
export class NgElementsStarterState {
  @Action(NgElementsStarterAction)
  public add(ctx: StateContext<NgElementsStarterStateModel>, action: NgElementsStarterAction) {
    const state = ctx.getState();
    ctx.setState({ theme: action.payload.theme || state.theme });
  }
}
