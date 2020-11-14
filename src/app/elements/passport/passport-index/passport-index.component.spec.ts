import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppPassportIndexComponent } from './passport-index.component';

describe('AppPassportIndexComponent', () => {
  let httpController: HttpTestingController;
  let fixture: ComponentFixture<AppPassportIndexComponent>;
  let component: AppPassportIndexComponent;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppPassportIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          httpController = TestBed.inject(HttpTestingController);
          fixture = TestBed.createComponent(AppPassportIndexComponent);
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
