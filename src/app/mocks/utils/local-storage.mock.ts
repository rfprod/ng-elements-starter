/**
 * Local storage mock for unit tests.
 */
export class LocalStorageMock {

  public getItem(key: string): any {
    return (this[key]) ? this[key] : undefined;
  }

  public setItem(key: string, value: string): void {
    this[key] = value;
  }

  public removeItem(key: string): void {
    this[key] = undefined;
  }
}
