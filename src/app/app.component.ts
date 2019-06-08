import { Component, OnInit } from '@angular/core';
import { AppIconsService } from './services/icons/icons.service';

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
export class AppComponent implements OnInit {

  /**
   * AppComponent constructor.
   * @param appIconsService Application icons service
   */
  constructor(
    private appIconsService: AppIconsService
  ) {

  }

  /**
   * Component title.
   */
  public title: string = 'ng-elements';

  /**
   * Component theme color.
   */
  public theme: 'primary'|'accent'|'warn' = 'primary';

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.appIconsService.initialize();
  }

}
