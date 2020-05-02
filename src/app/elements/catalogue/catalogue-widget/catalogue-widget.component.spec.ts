import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { CatalogueConfigComponent } from '../catalogue-config/catalogue-config.component';
import { CatalogueIndexComponent } from '../catalogue-index/catalogue-index.component';
import { CatalogueWidgetComponent } from './catalogue-widget.component';

describe('CatalogueWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: CatalogueWidgetComponent;
  let fixture: ComponentFixture<CatalogueWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [CatalogueWidgetComponent, CatalogueConfigComponent, CatalogueIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(CatalogueWidgetComponent);
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
