/**
 * Order interface.
 */
export class IOrder {
  public id: string = '';
  public status: string = '';
  public sum: number = 0;
  public goods: string[] = [];
  public sum4: number = 0;
}
