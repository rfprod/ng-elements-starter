import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { CatalogConfigComponent } from '../catalog-config/catalog-config.component';
import { CatalogIndexComponent } from '../catalog-index/catalog-index.component';
import { CatalogWidgetComponent } from './catalog-widget.component';

describe('CatalogWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: CatalogWidgetComponent;
  let fixture: ComponentFixture<CatalogWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [CatalogWidgetComponent, CatalogConfigComponent, CatalogIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(CatalogWidgetComponent);
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
