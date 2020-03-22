import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IUser } from '../../../interfaces/index';
import { CatalogueService } from '../../../services/catalogue/catalogue.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Catalogue index
 */
@Component({
  selector: 'app-catalogue-index',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100" *ngIf="!isLoggedIn()">
        user is not logged in
      </span>
      <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>
      <mat-grid-list fxFlex="100" cols="2" rowHeight="2:1" *ngIf="isLoggedIn()">
        <mat-grid-tile *ngFor="let item of catalogue()">
          {{ item }}
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  host: {
    class: 'mat-body-1',
  },
})
export class CatalogueIndexComponent implements OnInit, OnChanges {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Catalogue change event emitter.
   */
  @Output() public catalogueChange: EventEmitter<string[]> = new EventEmitter();

  /**
   * UI error reporter.
   */
  public errorReport = '';

  /**
   * Catalogue data.
   */
  private data: string[] = [];

  /**
   * Constructor.
   * @param userService User service
   * @param catalogueService Catalogue service
   */
  constructor(
    private readonly userService: UserService,
    private readonly catalogueService: CatalogueService,
  ) {}

  /**
   * Indicates if user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.userService.getUser().token ? true : false;
  }

  /**
   * Returns current catalogue.
   */
  public catalogue(): any[] {
    return this.data;
  }

  /**
   * Gets user catalogue.
   */
  public getCatalogue(): void {
    const serviceModel: IUser = this.userService.getUser();
    this.catalogueService.catalogue(this.mock, serviceModel.token || '$TOKEN').subscribe(
      (data: string[]) => {
        this.data = data;
        this.changeCatalogue();
      },
      (error: any) => {
        this.errorReport = error;
        setTimeout(() => {
          this.errorReport = '';
        }, 2500);
      },
    );
  }

  /**
   * Emits catalogue data change event.
   */
  public changeCatalogue(): void {
    this.catalogueChange.emit(this.data);
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.getCatalogue();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mock) {
      this.getCatalogue();
    }
  }
}
