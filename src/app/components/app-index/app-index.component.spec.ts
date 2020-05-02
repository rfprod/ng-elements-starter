import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from 'src/app/app-routing.module';
import { BalanceModule } from 'src/app/elements/balance/balance.module';
import { CatalogueModule } from 'src/app/elements/catalogue/catalogue.module';
import { OrdersModule } from 'src/app/elements/orders/orders.module';
import { PassportModule } from 'src/app/elements/passport/passport.module';
import { flushHttpRequests } from 'src/app/mocks/utils/http-controller.mock';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {
  let httpController: HttpTestingController;
  let component: AppIndexComponent;
  let fixture: ComponentFixture<AppIndexComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      PassportModule,
      BalanceModule,
      CatalogueModule,
      OrdersModule,
      RouterTestingModule.withRoutes(APP_ROUTES),
    ],
    declarations: [AppIndexComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(AppIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        flushHttpRequests(httpController);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });
});
