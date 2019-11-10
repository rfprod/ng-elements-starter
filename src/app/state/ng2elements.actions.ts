/**
 * Ng2elements Add action.
 */
export class Ng2elementsAction {
  /**
   * Action type.
   */
  static readonly type = '[Ng2elements] Add item';

  /**
   * Constructor.
   */
  constructor(
    public payload: {
      theme: string
    }
  ) { }

}
