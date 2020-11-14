import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppOrdersConfigComponent } from '../orders-config/orders-config.component';
import { AppOrdersIndexComponent } from '../orders-index/orders-index.component';
import { AppOrdersWidgetComponent } from './orders-widget.component';

describe('AppOrdersWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: AppOrdersWidgetComponent;
  let fixture: ComponentFixture<AppOrdersWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppOrdersWidgetComponent, AppOrdersConfigComponent, AppOrdersIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          httpController = TestBed.inject(HttpTestingController);
          fixture = TestBed.createComponent(AppOrdersWidgetComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
          flushHttpRequests(httpController);
        });
    }),
  );

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
