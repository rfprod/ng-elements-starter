import { Injectable } from '@angular/core';

import { MatIconRegistry } from '@angular/material';

import { DomSanitizer } from '@angular/platform-browser';
import { SvgIconInterface } from 'src/app/interfaces/svg-icon.interface';

/**
 * Application icons service.
 */
@Injectable({
  providedIn: 'root'
})
export class AppIconsService {

  /**
   * @param matIconRegistry Material icon registry - icons registry for registering icons for usage within mat-icon selector
   * @param domSanitizer DOM sanitizer
   */
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    console.log('CustomIconsService, model', this.model);
  }
  /**
   * Custom icons model.
   * Information stored here is used to add SVG icons to material icons registry.
   */
  private model: SvgIconInterface[] = [];

  /**
   * Returns custom icons array.
   */
  private getIcons(): any[] {
    return this.model;
  }

  /**
   * Registers custom svg icons to matIconRegistry.
   */
  private addIcons(): void {
    const icons: any[] = this.getIcons();
    for (const icon of icons) {
      console.log('adding icon', icon);
      this.matIconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
    }
  }

  /**
   * Registers fontawesome for usage with mat-icon by adding directives.
   * - fontSet="fab" fontIcon="fa-icon"
   * - fontSet="fas" fontIcon="fa-icon"
   *
   * Note: free plan includes only fab (font-awesome-brands) and fas (font-awesome-solid) groups
   *
   * Icons reference: https://fontawesome.com/icons/
   */
  private registerFontawesome(): void {
    console.log('registering fontawesome');
    this.matIconRegistry.registerFontClassAlias('all');
  }

  /**
   * Initialize mat icon registry.
   */
  public initialize(): void {
    this.registerFontawesome();
    this.addIcons();
    console.log('CustomIconsService initialized, this.matIconRegistry', this.matIconRegistry);
  }

  public getMatIconRegistry(): MatIconRegistry {
    return this.matIconRegistry;
  }

}
