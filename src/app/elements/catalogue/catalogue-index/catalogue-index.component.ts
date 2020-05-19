import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TCatalogue } from 'src/app/interfaces/catalogue.interface';

import { IUser } from '../../../interfaces/index';
import { CatalogueService } from '../../../services/catalogue/catalogue.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Catalogue index
 */
@Component({
  selector: 'app-catalogue-index',
  templateUrl: './catalogue-index.component.html',
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
   * Catalogue data.
   */
  private data: TCatalogue = [];

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
    return this.userService.isLoggedIn();
  }

  /**
   * Returns current catalogue.
   */
  public catalogue(): TCatalogue {
    return this.data;
  }

  /**
   * Gets user catalogue.
   */
  public getCatalogue() {
    const serviceModel: IUser = this.userService.getUser();
    void this.catalogueService
      .catalogue(this.mock, Boolean(serviceModel.token) ? serviceModel.token : '$TOKEN')
      .subscribe(
        (data: TCatalogue) => {
          this.data = data;
          this.changeCatalogue();
        },
        _ => null,
      );
  }

  /**
   * Emits catalogue data change event.
   */
  public changeCatalogue(): void {
    this.catalogueChange.emit(this.data);
  }

  public ngOnInit(): void {
    this.getCatalogue();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mock) {
      this.getCatalogue();
    }
  }
}
