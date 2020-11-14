import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppPassportConfigComponent } from '../passport-config/passport-config.component';
import { AppPassportIndexComponent } from '../passport-index/passport-index.component';
import { AppPassportLoginComponent } from '../passport-login/passport-login.component';
import { AppPassportSignupComponent } from '../passport-signup/passport-signup.component';
import { AppPassportWidgetComponent } from '../passport-widget/passport-widget.component';

describe('AppPassportWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: AppPassportWidgetComponent;
  let fixture: ComponentFixture<AppPassportWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [
      AppPassportWidgetComponent,
      AppPassportConfigComponent,
      AppPassportIndexComponent,
      AppPassportLoginComponent,
      AppPassportSignupComponent,
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          httpController = TestBed.inject(HttpTestingController);
          fixture = TestBed.createComponent(AppPassportWidgetComponent);
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
