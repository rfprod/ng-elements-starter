import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Dummy component.
 *
 * @description For usage in unit tests where applicable.
 */
@Component({
  selector: 'app-dummy-component',
  template: '<span>summy component</span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DummyComponent {}
