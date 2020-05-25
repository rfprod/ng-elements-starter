import { Component, OnInit } from '@angular/core';

import { AppIconsService } from './services/icons/icons.service';

/**
 * Application root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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

  constructor(private readonly appIconsService: AppIconsService) {}

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.appIconsService.initialize();
  }
}
