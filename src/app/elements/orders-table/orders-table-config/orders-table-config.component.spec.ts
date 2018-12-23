import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { OrdersTableConfigComponent } from './orders-table-config.component';

describe('OrdersTableConfigComponent', () => {

  let component: OrdersTableConfigComponent;
  let fixture: ComponentFixture<OrdersTableConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, CustomMaterialModule, FlexLayoutModule
      ],
      declarations: [
        OrdersTableConfigComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTableConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
