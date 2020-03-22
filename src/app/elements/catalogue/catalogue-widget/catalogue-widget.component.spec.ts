import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WINDOW, getWindow } from 'src/app/utils';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';
import { CatalogueService } from '../../../services/catalogue/catalogue.service';
import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';
import { UserService } from '../../../services/user/user.service';
import { CatalogueConfigComponent } from '../catalogue-config/catalogue-config.component';
import { CatalogueIndexComponent } from '../catalogue-index/catalogue-index.component';
import { CatalogueWidgetComponent } from './catalogue-widget.component';

describe('CatalogueWidgetComponent', () => {
  let httpController: HttpTestingController;
  let component: CatalogueWidgetComponent;
  let fixture: ComponentFixture<CatalogueWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: WINDOW, useFactory: getWindow },
        UserService,
        {
          provide: CustomHttpHandlersService,
          useFactory: (userService, win) => new CustomHttpHandlersService(userService, win),
          deps: [UserService, WINDOW],
        },
        {
          provide: CatalogueService,
          useFactory: (http, handlers, win) => new CatalogueService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
      ],
      declarations: [CatalogueWidgetComponent, CatalogueConfigComponent, CatalogueIndexComponent],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(CatalogueWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        httpController
          .match((req: HttpRequest<any>): boolean => true)
          .forEach((req: TestRequest) => {
            req.flush({});
          });
      });
  }));

  afterEach(() => {
    httpController
      .match((req: HttpRequest<any>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
