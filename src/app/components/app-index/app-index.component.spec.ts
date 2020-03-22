import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WINDOW, getWindow } from 'src/app/utils';
import { BalanceModule } from '../../elements/balance/balance.module';
import { CatalogueModule } from '../../elements/catalogue/catalogue.module';
import { OrdersModule } from '../../elements/orders/orders.module';
import { PassportModule } from '../../elements/passport/passport.module';
import { CustomMaterialModule } from '../../modules/material/custom-material.module';
import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {
  let component: AppIndexComponent;
  let fixture: ComponentFixture<AppIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        PassportModule,
        BalanceModule,
        CatalogueModule,
        OrdersModule,
      ],
      providers: [{ provide: WINDOW, useFactory: getWindow }],
      declarations: [AppIndexComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });
});
