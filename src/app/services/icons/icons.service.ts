import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ISvgIconInterface } from 'src/app/interfaces/svg-icon.interface';

/**
 * Application icons service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppIconsService {
  /**
   * Custom icons model.
   * Information stored here is used to add SVG icons to material icons registry.
   */
  private readonly model: ISvgIconInterface[] = [];
  /**
   * Constructor.
   * @param matIconRegistry Material icon registry - icons registry for registering icons for usage within mat-icon selector
   * @param domSanitizer DOM sanitizer
   */
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {}

  /**
   * Initialize mat icon registry.
   */
  public initialize(): void {
    this.registerFontawesome();
    this.addIcons();
  }

  public getMatIconRegistry(): MatIconRegistry {
    return this.matIconRegistry;
  }

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
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path),
      );
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
    this.matIconRegistry.registerFontClassAlias('all');
  }
}
