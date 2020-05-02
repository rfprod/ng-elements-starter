import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { BalanceConfigComponent } from '../balance-config/balance-config.component';
import { BalanceIndexComponent } from '../balance-index/balance-index.component';
import { BalanceWidgetComponent } from './balance-widget.component';

describe('BalanceWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: BalanceWidgetComponent;
  let fixture: ComponentFixture<BalanceWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [BalanceWidgetComponent, BalanceConfigComponent, BalanceIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(BalanceWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        flushHttpRequests(httpController);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
