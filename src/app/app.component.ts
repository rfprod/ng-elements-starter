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
    class: 'mat-body-1',
  },
})
export class AppComponent implements OnInit {
  /**
   * Component title.
   */
  public title = 'ng-elements-starter';

  /**
   * Component theme color.
   */
  public theme: 'primary' | 'accent' | 'warn' = 'primary';
  /**
   * Constructor.
   * @param appIconsService Application icons service
   */
  constructor(private readonly appIconsService: AppIconsService) {}

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.appIconsService.initialize();
  }
}
