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
import { AuthService } from '../../../services/auth/auth.service';
import { CustomHttpHandlersService } from '../../../services/http-handlers/custom-http-handlers.service';
import { UserService } from '../../../services/user/user.service';
import { PassportLoginComponent } from './passport-login.component';

describe('PassportLoginComponent', () => {
  let httpController: HttpTestingController;
  let fixture: ComponentFixture<PassportLoginComponent>;
  let component: PassportLoginComponent;

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
          provide: AuthService,
          useFactory: (http, handlers, win) => new AuthService(http, handlers, win),
          deps: [HttpClient, CustomHttpHandlersService, WINDOW],
        },
      ],
      declarations: [PassportLoginComponent],
    })
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(PassportLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  afterEach(() => {
    httpController
      .match((req: HttpRequest<any>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
