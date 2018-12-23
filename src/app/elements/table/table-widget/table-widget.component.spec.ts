import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { TableWidgetComponent } from './table-widget.component';
import { TableConfigComponent } from '../table-config/table-config.component';

describe('TableWidgetComponent', () => {

  let component: TableWidgetComponent;
  let fixture: ComponentFixture<TableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule, CustomMaterialModule, FlexLayoutModule
      ],
      declarations: [
        TableWidgetComponent, TableConfigComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
