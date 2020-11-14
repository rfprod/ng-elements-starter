import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppCatalogConfigComponent } from '../catalog-config/catalog-config.component';
import { AppCatalogIndexComponent } from '../catalog-index/catalog-index.component';
import { AppCatalogWidgetComponent } from './catalog-widget.component';

describe('AppCatalogWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: AppCatalogWidgetComponent;
  let fixture: ComponentFixture<AppCatalogWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppCatalogWidgetComponent, AppCatalogConfigComponent, AppCatalogIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          httpController = TestBed.inject(HttpTestingController);
          fixture = TestBed.createComponent(AppCatalogWidgetComponent);
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
