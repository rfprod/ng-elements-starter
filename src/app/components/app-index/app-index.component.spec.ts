import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import '../../../../node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../modules/material/custom-material.module';

import { ChatModule } from '../../elements/chat/chat.module';
import { PassportModule } from '../../elements/passport/passport.module';
import { BalanceModule } from '../../elements/balance/balance.module';
import { CatalogueModule } from '../../elements/catalogue/catalogue.module';
import { OrdersModule } from '../../elements/orders/orders.module';

import { AppIndexComponent } from './app-index.component';

describe('AppIndexComponent', () => {

  let component: AppIndexComponent;
  let fixture: ComponentFixture<AppIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule,
        CustomMaterialModule, FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        ChatModule, PassportModule, BalanceModule, CatalogueModule,
        OrdersModule
      ],
      providers: [
        { provide: 'Window', useValue: window }
      ],
      declarations: [
        AppIndexComponent
      ]
    })
    .compileComponents().then(() => {
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
