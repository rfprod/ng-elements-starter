import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { concatMap, filter, first } from 'rxjs/operators';
import { TCatalog } from 'src/app/interfaces/catalog.interface';

import { CatalogService } from '../../../services/catalog/catalog.service';
import { UserService } from '../../../services/user/user.service';

/**
 * Catalog index
 */
@Component({
  selector: 'app-catalog-index',
  templateUrl: './catalog-index.component.html',
  styleUrls: ['./catalog-index.component.scss'],
})
export class CatalogIndexComponent implements OnInit, OnChanges {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Catalog change event emitter.
   */
  @Output() public catalogChange: EventEmitter<string[]> = new EventEmitter();

  /**
   * Catalog data.
   */
  private data: TCatalog = [];

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(
    private readonly userService: UserService,
    private readonly catalogService: CatalogService,
  ) {}

  /**
   * Returns current catalog.
   */
  public catalog(): TCatalog {
    return this.data;
  }

  /**
   * Gets user catalog.
   */
  public getCatalog() {
    void this.userService.userToken$
      .pipe(
        filter(token => Boolean(token)),
        first(),
        concatMap(token => this.catalogService.catalog(this.mock, token)),
      )
      .subscribe(
        (data: TCatalog) => {
          this.data = data;
          this.changeCatalog();
        },
        _ => null,
      );
  }

  /**
   * Emits catalog data change event.
   */
  public changeCatalog(): void {
    this.catalogChange.emit(this.data);
  }

  public ngOnInit(): void {
    this.getCatalog();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mock) {
      this.getCatalog();
    }
  }
}
