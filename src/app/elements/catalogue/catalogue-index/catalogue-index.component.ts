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
import { TCatalogue } from 'src/app/interfaces/catalogue.interface';

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

  public readonly isLoggedIn$ = this.userService.isLoggedIn$;

  constructor(
    private readonly userService: UserService,
    private readonly catalogueService: CatalogueService,
  ) {}

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
    void this.userService.userToken$
      .pipe(
        filter(token => Boolean(token)),
        first(),
        concatMap(token => this.catalogueService.catalogue(this.mock, token)),
      )
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
