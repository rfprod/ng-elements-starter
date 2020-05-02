/**
 * Order interface.
 */
export class IOrder {
  public id = '';
  public status = '';
  public sum = 0;
  public goods: string[] = [];
  public sum4 = 0;
  public date = new Date().getTime();
}
