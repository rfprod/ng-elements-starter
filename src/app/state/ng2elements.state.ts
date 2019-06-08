import { State, Action, StateContext } from '@ngxs/store';
import { Ng2elementsAction } from './ng2elements.actions';

/**
 * Ng2elements state model.
 */
export class Ng2elementsStateModel {
  public theme: string;
}

/**
 * Ng2elements state.
 */
@State<Ng2elementsStateModel>({
  name: 'ng2elements',
  defaults: {
    theme: null
  }
})
export class Ng2elementsState {

  @Action(Ng2elementsAction)
  add(ctx: StateContext<Ng2elementsStateModel>, action: Ng2elementsAction) {
    const state = ctx.getState();
    ctx.setState({ theme: action.payload.theme || state.theme });
  }

}
