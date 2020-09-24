import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from 'src/app/mocks/utils/test-bed-config.mock';

import { AppCatalogConfigComponent } from './catalog-config.component';

describe('AppCatalogConfigComponent', () => {
  let component: AppCatalogConfigComponent;
  let fixture: ComponentFixture<AppCatalogConfigComponent>;

  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppCatalogConfigComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppCatalogConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have variables and methods defined', () => {
    expect(component.theme).toEqual(expect.any(String));
    expect(component.title).toEqual(expect.any(String));
    expect(component.themeChange).toEqual(expect.any(EventEmitter));
    expect(component.themes).toEqual(expect.any(Array));
    expect(component.setTheme).toEqual(expect.any(Function));
    expect(component.matButtonToggleChange).toEqual(expect.any(Function));
    expect(component.mock).toEqual(expect.any(Boolean));
    expect(component.serverChange).toEqual(expect.any(EventEmitter));
    expect(component.selectServer).toEqual(expect.any(Function));
    expect(component.serverChangeEvent).toEqual(expect.any(Function));
  });
});
