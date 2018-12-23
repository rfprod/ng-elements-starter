import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { fadeIn, fadeInOut } from '../animations';

import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

import { ILoginForm } from '../../../interfaces/index';

/**
 * @title Passport login
 */
@Component({
  selector: 'passport-login',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100">
        {{title}}
      </span>
      <span fxFlex="100" fxLayout="row wrap" fxLayoutAlign="center center">
        <button mat-button (click)="modeChange('index')">Index</button>
        <button mat-button (click)="modeChange('signup')" *ngIf="restrictMode !== 'signup'">Signup</button>
      </span>

      <form fxFlex="100" fxLayout="row wrap" fxLayoutAlign="start start" [formGroup]="loginForm" (ngSubmit)="submitForm()" novalidate class="mat-body-2">

        <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>

        <mat-form-field fxFlex="100">
          <input matInput type="email" name="email" [formControl]="loginForm.controls.email" placeholder="email" required />
          <mat-icon matSuffix class="material-icons">mail</mat-icon>
          <mat-error *ngIf="loginForm.controls.email.invalid" class="mat-body-1">
            invalid email
          </mat-error>
        </mat-form-field>
        <mat-form-field fxFlex="100">
          <input matInput type="{{showPassword ? 'text' : 'password'}}" name="password" [formControl]="loginForm.controls.password" placeholder="password" required />
          <mat-icon matSuffix class="material-icons" (click)="togglePasswordVisibility()">lock</mat-icon>
          <mat-error *ngIf="loginForm.controls.password.invalid" class="mat-body-1">
            1+ characters
          </mat-error>
        </mat-form-field>

        <mat-toolbar [color]="theme">
          <button mat-button type="submit" [disabled]="loginForm.pristine || loginForm.invalid" aria-label="submit">
            Login
          </button>
        </mat-toolbar>
      </form>
    </div>
  `,
  animations: [fadeIn, fadeInOut],
  host: {
    class: 'mat-body-1'
  }
})
export class PassportLoginComponent implements OnInit {

  /**
   * @param fb Form builder
   * @param userService User service
   * @param authService Auth service
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.resetForm();
  }

  /**
   * Component theme.
   */
  @Input() public theme: 'primary'|'accent'|'warn';

  /**
   * Component title.
   */
  @Input() public title: string = 'Passport Login';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock: boolean = true;

  /**
   * Switch mode event emitter.
   */
  @Output() public switchMode: EventEmitter<string> = new EventEmitter();

  /**
   * Emits mode change event.
   * @param mode mode that should be activated by widget component.
   */
  public modeChange(mode: 'index'|'signup'): void {
    this.switchMode.emit(mode);
  }

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login'|'signup'|null = null;

  /**
   * Signup form.
   */
  public loginForm: ILoginForm;

  /**
   * Resets signup form.
   */
  public resetForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    }) as ILoginForm;
  }

  /**
   * Indicates if password should be showm.
   */
  public showPassword: boolean = false;

  /**
   * Toggles password visibility.
   */
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * UI error reporter.
   */
  public errorReport: string = '';

  /**
   * Sends signup request with provided credentials.
   */
  public submitForm(): void {
    const formData: {
      email: string, password: string
    } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(this.mock, formData.email, formData.password).subscribe(
        (data: any) => {
          console.log('login success, data', data);
          this.userService.SaveUser(data);
          this.modeChange('index');
        },
        (error: any) => {
          console.log('login error, error', error);
          this.errorReport = error;
          setTimeout(() => {
            this.errorReport = '';
          }, 2500);
        }
      );
      this.resetForm();
    }
  }

  /**
   * Lifecysle hook called on component initialization.
   */
  public ngOnInit(): void {
    if (this.userService.getUser().token) {
      this.modeChange('index');
    }
  }

}
