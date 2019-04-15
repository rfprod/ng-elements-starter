import { Component } from '@angular/core';

/**
 * Application root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
		class: 'mat-body-1'
	}
})
export class AppComponent {

  /**
   * Component title.
   */
  public title: string = 'ng-elements';

  /**
   * Component theme color.
   */
  public theme: 'primary'|'accent'|'warn' = 'primary';

}
