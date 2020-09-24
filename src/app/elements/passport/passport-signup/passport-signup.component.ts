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

import { ISignupForm, IThemeColorChange, IUserDto } from '../../../interfaces/index';
import { AppAuthService } from '../../../services/auth/auth.service';
import { AppUserService } from '../../../services/user/user.service';
import { fadeIn, fadeInOut } from '../animations';

/**
 * Passport signup
 */
@Component({
  selector: 'app-passport-signup',
  templateUrl: './passport-signup.component.html',
  styleUrls: ['./passport-signup.component.scss'],
  animations: [fadeIn, fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPassportSignupComponent implements OnInit {
  /**
   * Component theme.
   */
  @Input() public theme: IThemeColorChange['theme'] = 'primary';

  /**
   * Component title.
   */
  @Input() public title = 'Passport Signup';

  /**
   * Indicates if mocked server should be used for http requests.
   */
  @Input() public mock = true;

  /**
   * Indicates if a particular passport mode is restricted:
   * - login
   * - signup
   * - null
   * null indicates that there is no mode restriction.
   */
  @Input() public restrictMode: 'login' | 'signup' | null = null;

  /**
   * Switch mode event emitter.
   */
  @Output() public readonly switchMode: EventEmitter<string> = new EventEmitter();

  /**
   * Signup form.
   */
  public signupForm: ISignupForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    organization: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  }) as ISignupForm;

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
  public submitForm() {
    const formData: {
      name: string;
      email: string;
      organization: string;
      password: string;
    } = this.signupForm.value;
    if (this.signupForm.valid) {
      void this.authService
        .signup(this.mock, formData.email, formData.password, formData.organization, formData.name)
        .subscribe((data: IUserDto) => {
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
