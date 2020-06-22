import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppIndexComponent } from './components/app-index/app-index.component';
import { AppBalanceModule } from './elements/balance/balance.module';
import { AppCatalogModule } from './elements/catalog/catalog.module';
import { AppOrdersModule } from './elements/orders/orders.module';
import { AppPassportModule } from './elements/passport/passport.module';
import { getTestBedConfig, newTestBedMetadata } from './mocks/utils/test-bed-config.mock';

describe('AppComponent', () => {
  let httpController: HttpTestingController;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppPassportModule, AppBalanceModule, AppCatalogModule, AppOrdersModule],
    declarations: [AppComponent, AppIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
      });
  }));

  afterEach(() => {
    httpController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "ng-elements-starter"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-elements-starter');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-elements-starter!');
  });
});
