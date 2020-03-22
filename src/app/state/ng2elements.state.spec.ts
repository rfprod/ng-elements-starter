import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { NgElementsStarterAction } from './ng2elements.actions';
import { NgElementsStarterState } from './ng2elements.state';

describe('Ng2elements actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([NgElementsStarterState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and set theme', () => {
    store.dispatch(new NgElementsStarterAction({ theme: 'item-1' }));
    store
      .select(state => state.ngElementsStarter.theme)
      .subscribe((theme: string) => {
        expect(theme).toEqual('item-1');
      });
  });
});
