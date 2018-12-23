import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import 'node_modules/hammerjs/hammer.js';
import { CustomMaterialModule } from '../../../modules/material/custom-material.module';

import { PassportConfigComponent } from '../passport-config/passport-config.component';
import { PassportIndexComponent } from '../passport-index/passport-index.component';
import { PassportLoginComponent } from '../passport-login/passport-login.component';
import { PassportSignupComponent } from '../passport-signup/passport-signup.component';
import { PassportWidgetComponent } from '../passport-widget/passport-widget.component';

import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';

describe('PassportWidgetComponent', () => {

  let httpController: HttpTestingController;
  let component: PassportWidgetComponent;
  let fixture: ComponentFixture<PassportWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule, NoopAnimationsModule,
        CustomMaterialModule, FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        HttpClientTestingModule
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
        PassportWidgetComponent,
        PassportConfigComponent, PassportIndexComponent, PassportLoginComponent, PassportSignupComponent
      ]
    })
    .compileComponents().then(() => {
      httpController = TestBed.get(HttpTestingController);
      fixture = TestBed.createComponent(PassportWidgetComponent);
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
