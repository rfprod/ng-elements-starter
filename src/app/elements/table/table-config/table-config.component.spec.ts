import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { TableConfigComponent } from './table-config.component';

describe('TableConfigComponent', () => {

  let component: TableConfigComponent;
  let fixture: ComponentFixture<TableConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, CustomMaterialModule, FlexLayoutModule
      ],
      declarations: [
        TableConfigComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConfigComponent);
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
  });
});
