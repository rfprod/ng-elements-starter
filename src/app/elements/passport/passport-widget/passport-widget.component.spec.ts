import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { PassportConfigComponent } from '../passport-config/passport-config.component';
import { PassportIndexComponent } from '../passport-index/passport-index.component';
import { PassportLoginComponent } from '../passport-login/passport-login.component';
import { PassportSignupComponent } from '../passport-signup/passport-signup.component';
import { PassportWidgetComponent } from '../passport-widget/passport-widget.component';

describe('PassportWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: PassportWidgetComponent;
  let fixture: ComponentFixture<PassportWidgetComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [
      PassportWidgetComponent,
      PassportConfigComponent,
      PassportIndexComponent,
      PassportLoginComponent,
      PassportSignupComponent,
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(PassportWidgetComponent);
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
