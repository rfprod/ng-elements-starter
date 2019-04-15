import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

/**
 * @title Application index component
 * @description Includes element modules
 */
@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.css'],
  host: {
    class: 'mat-body-1'
  }
})
export class AppIndexComponent implements OnInit, OnDestroy {

  /**
   * @param el Element reference
   */
  constructor(
    private el: ElementRef
  ) {}

  /**
   * Component theme color.
   */
  public theme: 'primary'|'accent'|'warn' = 'primary';

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    console.log('AppIndex component initialized');
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    console.log('AppIndex component destroyed');
  }

}
