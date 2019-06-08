/**
 * Ng2elements Add action.
 */
export class Ng2elementsAction {
  /**
   * Action type.
   */
  static readonly type = '[Ng2elements] Add item';

  /**
   * Ng2elementsAction constructor.
   */
  constructor(
    public payload: {
      theme: string
    }
  ) { }

}
