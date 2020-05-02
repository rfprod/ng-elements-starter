import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ILoginForm } from '../../../interfaces/index';
import { IUser } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { fadeIn, fadeInOut } from '../animations';

/**
 * Passport login
 */
@Component({
  selector: 'app-passport-login',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100">
        {{ title }}
      </span>
      <span fxFlex="100" fxLayout="row wrap" fxLayoutAlign="center center">
        <button mat-button (click)="modeChange('index')">Index</button>
        <button mat-button (click)="modeChange('signup')" *ngIf="restrictMode !== 'signup'">
          Signup
        </button>
      </span>

      <form
        fxFlex="100"
        fxLayout="row wrap"
        fxLayoutAlign="start start"
        [formGroup]="loginForm"
        (ngSubmit)="submitForm()"
        novalidate
        class="mat-body-2"
      >
        <mat-form-field fxFlex="100">
          <input
            matInput
            type="email"
            name="email"
            [formControl]="loginForm.controls.email"
            placeholder="email"
            required
          />
          <mat-icon matSuffix class="material-icons">mail</mat-icon>
          <mat-error *ngIf="loginForm.controls.email.invalid" class="mat-body-1">
            invalid email
          </mat-error>
        </mat-form-field>
        <mat-form-field fxFlex="100">
          <input
            matInput
            type="{{ showPassword ? 'text' : 'password' }}"
            name="password"
            [formControl]="loginForm.controls.password"
            placeholder="password"
            required
          />
          <mat-icon matSuffix class="material-icons" (click)="togglePasswordVisibility()"
            >lock</mat-icon
          >
          <mat-error *ngIf="loginForm.controls.password.invalid" class="mat-body-1">
            1+ characters
          </mat-error>
        </mat-form-field>

        <mat-toolbar [color]="theme">
          <button
            mat-button
            type="submit"
            [disabled]="loginForm.pristine || loginForm.invalid"
            aria-label="submit"
          >
            Login
          </button>
        </mat-toolbar>
      </form>
    </div>
  `,
  animations: [fadeIn, fadeInOut],
  host: {
    class: 'mat-body-1',
  },
})
export class PassportLoginComponent implements OnInit {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Component title.
   */
  @Input() public title = 'Passport Login';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Switch mode event emitter.
   */
  @Output() public switchMode: EventEmitter<string> = new EventEmitter();

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login' | 'signup' | null = null;

  /**
   * Signup form.
   */
  public loginForm: ILoginForm;

  /**
   * Indicates if password should be showm.
   */
  public showPassword = false;

  /**
   * Constructor.
   * @param fb Form builder
   * @param userService User service
   * @param authService Auth service
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    this.resetForm();
  }

  /**
   * Emits mode change event.
   * @param mode mode that should be activated by widget component.
   */
  public modeChange(mode: 'index' | 'signup'): void {
    this.switchMode.emit(mode);
  }

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
   * Toggles password visibility.
   */
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Sends signup request with provided credentials.
   */
  public submitForm(): void {
    const formData: {
      email: string;
      password: string;
    } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(this.mock, formData.email, formData.password).subscribe(
        (data: IUser) => {
          this.userService.saveUser(data);
          this.modeChange('index');
        },
        _ => null,
      );
      this.resetForm();
    }
  }

  /**
   * Lifecysle hook called on component initialization.
   */
  public ngOnInit(): void {
    if (Boolean(this.userService.getUser().token)) {
      this.modeChange('index');
    }
  }
}
