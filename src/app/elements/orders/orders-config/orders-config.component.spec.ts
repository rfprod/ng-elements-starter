import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { OrdersConfigComponent } from './orders-config.component';

describe('OrdersConfigComponent', () => {
  let component: OrdersConfigComponent;
  let fixture: ComponentFixture<OrdersConfigComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [OrdersConfigComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(_ => {
        fixture = TestBed.createComponent(OrdersConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have variables and methods defined', () => {
    expect(component.theme).toBeUndefined();
    expect(component.title).toEqual(jasmine.any(String));
    expect(component.themeChange).toEqual(jasmine.any(EventEmitter));
    expect(component.themes).toEqual(jasmine.any(Array));
    expect(component.setTheme).toEqual(jasmine.any(Function));
    expect(component.matButtonToggleChange).toEqual(jasmine.any(Function));
    expect(component.mock).toEqual(jasmine.any(Boolean));
    expect(component.serverChange).toEqual(jasmine.any(EventEmitter));
    expect(component.selectServer).toEqual(jasmine.any(Function));
    expect(component.serverChangeEvent).toEqual(jasmine.any(Function));
  });
});
