import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { PassportSignupComponent } from './passport-signup.component';

describe('PassportSignupComponent', () => {
  let httpController: HttpTestingController;
  let fixture: ComponentFixture<PassportSignupComponent>;
  let component: PassportSignupComponent;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [PassportSignupComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(PassportSignupComponent);
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
