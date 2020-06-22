import { Observable } from 'rxjs';
import { IActionPayload } from 'src/app/utils/ngxs.util';

export interface IUiStateModel {
  darkThemeEnabled: boolean;
}

export type TUiPayload = IActionPayload<IUiStateModel>;

export interface IAppUiService {
  darkThemeEnabled$: Observable<boolean>;
}
