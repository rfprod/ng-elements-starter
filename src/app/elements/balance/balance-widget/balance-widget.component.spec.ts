import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppBalanceConfigComponent } from '../balance-config/balance-config.component';
import { AppBalanceIndexComponent } from '../balance-index/balance-index.component';
import { AppBalanceWidgetComponent } from './balance-widget.component';

describe('AppBalanceWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: AppBalanceWidgetComponent;
  let fixture: ComponentFixture<AppBalanceWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppBalanceWidgetComponent, AppBalanceConfigComponent, AppBalanceIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(AppBalanceWidgetComponent);
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
