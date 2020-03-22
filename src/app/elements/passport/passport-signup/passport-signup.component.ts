import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISignupForm } from '../../../interfaces/index';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { fadeIn, fadeInOut } from '../animations';

/**
 * Passport signup
 */
@Component({
  selector: 'app-passport-signup',
  template: `
    <div fxLayout="row wrap">
      <span fxFlex="100">
        {{ title }}
      </span>
      <span fxFlex="100" fxLayout="row wrap" fxLayoutAlign="center center">
        <button mat-button (click)="modeChange('index')">Index</button>
        <button mat-button (click)="modeChange('login')" *ngIf="restrictMode !== 'login'">
          Login
        </button>
      </span>

      <form
        fxFlex="100"
        fxLayout="row wrap"
        fxLayoutAlign="start start"
        [formGroup]="signupForm"
        (ngSubmit)="submitForm()"
        novalidate
        class="mat-body-2"
      >
        <div fxFlex="100" *ngIf="errorReport" [innerHtml]="errorReport"></div>

        <mat-form-field fxFlex="100">
          <input
            matInput
            type="text"
            name="name"
            [formControl]="signupForm.controls.name"
            placeholder="username"
            required
          />
          <mat-icon matSuffix class="material-icons">user</mat-icon>
          <mat-error *ngIf="signupForm.controls.name.invalid" class="mat-body-1">
            1+ characters
          </mat-error>
        </mat-form-field>
        <mat-form-field fxFlex="100">
          <input
            matInput
            type="email"
            name="email"
            [formControl]="signupForm.controls.email"
            placeholder="email"
            required
          />
          <mat-icon matSuffix class="material-icons">mail</mat-icon>
          <mat-error *ngIf="signupForm.controls.email.invalid" class="mat-body-1">
            invalid email
          </mat-error>
        </mat-form-field>
        <mat-form-field fxFlex="100">
          <input
            matInput
            type="text"
            name="organization"
            [formControl]="signupForm.controls.organization"
            placeholder="organization"
            required
          />
          <mat-icon matSuffix class="material-icons">business</mat-icon>
          <mat-error *ngIf="signupForm.controls.organization.invalid" class="mat-body-1">
            1+ characters
          </mat-error>
        </mat-form-field>
        <mat-form-field fxFlex="100">
          <input
            matInput
            type="{{ showPassword ? 'text' : 'password' }}"
            name="password"
            [formControl]="signupForm.controls.password"
            placeholder="password"
            required
          />
          <mat-icon matSuffix class="material-icons" (click)="togglePasswordVisibility()"
            >lock</mat-icon
          >
          <mat-error *ngIf="signupForm.controls.password.invalid" class="mat-body-1">
            1+ characters
          </mat-error>
        </mat-form-field>

        <mat-toolbar [color]="theme">
          <button
            mat-button
            type="submit"
            [disabled]="signupForm.pristine || signupForm.invalid"
            aria-label="submit"
          >
            Signup
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
export class PassportSignupComponent implements OnInit {
  /**
   * Component theme.
   */
  @Input() public theme: 'primary' | 'accent' | 'warn';

  /**
   * Component title.
   */
  @Input() public title = 'Passport Signup';

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
  public signupForm: ISignupForm;

  /**
   * Indicates if password should be showm.
   */
  public showPassword = false;

  /**
   * UI error reporter.
   */
  public errorReport = '';
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
  public modeChange(mode: 'index' | 'login'): void {
    this.switchMode.emit(mode);
  }

  /**
   * Resets signup form.
   */
  public resetForm(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      organization: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    }) as ISignupForm;
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
      name: string;
      email: string;
      organization: string;
      password: string;
    } = this.signupForm.value;
    if (this.signupForm.valid) {
      this.authService
        .signup(this.mock, formData.email, formData.password, formData.organization, formData.name)
        .subscribe(
          (data: any) => {
            this.userService.SaveUser(data);
            this.modeChange('index');
          },
          (error: any) => {
            this.errorReport = error;
            setTimeout(() => {
              this.errorReport = '';
            }, 2500);
          },
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
