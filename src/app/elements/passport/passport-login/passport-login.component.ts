import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';

import { ILoginForm, IThemeColorChange } from '../../../interfaces/index';
import { AppUser } from '../../../interfaces/user.interface';
import { AppAuthService } from '../../../services/auth/auth.service';
import { AppUserService } from '../../../services/user/user.service';
import { fadeIn, fadeInOut } from '../animations';

/**
 * Passport login
 */
@Component({
  selector: 'app-passport-login',
  templateUrl: './passport-login.component.html',
  styleUrls: ['./passport-login.component.scss'],
  animations: [fadeIn, fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPassportLoginComponent implements OnInit {
  /**
   * Component theme.
   */
  @Input() public theme: IThemeColorChange['theme'] = 'primary';

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
  @Output() public readonly switchMode: EventEmitter<string> = new EventEmitter();

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
  public loginForm: ILoginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  }) as ILoginForm;

  /**
   * Indicates if password should be showm.
   */
  public showPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: AppUserService,
    private readonly authService: AppAuthService,
  ) {}

  /**
   * Emits mode change event.
   *
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
  public submitForm() {
    const formData: {
      email: string;
      password: string;
    } = this.loginForm.value;
    if (this.loginForm.valid) {
      void this.authService
        .login(this.mock, formData.email, formData.password)
        .subscribe((data: AppUser) => {
          this.userService.saveUser(data);
          this.modeChange('index');
          this.resetForm();
        });
    }
  }

  public ngOnInit(): void {
    void this.userService.isLoggedIn$
      .pipe(
        first(),
        tap(result => {
          if (result) {
            this.modeChange('index');
          }
        }),
      )
      .subscribe();
  }
}
