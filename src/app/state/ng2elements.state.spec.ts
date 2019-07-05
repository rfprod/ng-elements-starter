import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Ng2elementsState } from './ng2elements.state';
import { Ng2elementsAction } from './ng2elements.actions';

describe('Ng2elements actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([Ng2elementsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and set theme', () => {
    store.dispatch(new Ng2elementsAction({ theme: 'item-1' }));
    store.select(state => state.ng2elements.theme).subscribe((theme: string) => {
      expect(theme).toEqual('item-1');
    });
  });

});
