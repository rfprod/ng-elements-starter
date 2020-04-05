export class NgElementsStarterAction {
  public static readonly type = '[NgElementsStarter] Add item';
  constructor(public payload: { theme: string }) {}
}
