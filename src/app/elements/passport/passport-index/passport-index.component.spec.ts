import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { PassportIndexComponent } from './passport-index.component';

import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

describe('PassportIndexComponent', () => {

  let httpController: HttpTestingController;
  let fixture: ComponentFixture<PassportIndexComponent>;
  let component: PassportIndexComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule,
        CustomMaterialModule, FlexLayoutModule, HttpClientTestingModule
      ],
      providers: [
        { provide: 'Window', useValue: window },
        UserService,
        {
          provide: CustomHttpHandlersService,
          useFactory: (userService, win) => new CustomHttpHandlersService(userService, win),
          deps: [UserService, 'Window']
        },
        {
          provide: AuthService,
          useFactory: (http, handlers, win) => new AuthService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, 'Window']
        }
      ],
      declarations: [
        PassportIndexComponent
      ]
    })
    .compileComponents().then(() => {
      httpController = TestBed.get(HttpTestingController) as HttpTestingController;
      fixture = TestBed.createComponent(PassportIndexComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    httpController.match((req: HttpRequest<any>): boolean => true).forEach((req: TestRequest) => req.flush({}));
    httpController.verify();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
