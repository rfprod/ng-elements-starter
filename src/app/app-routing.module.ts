import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppIndexComponent } from './components/app-index/app-index.component';

/**
 * Application routes.
 */
const routes: Routes = [
  { path: '', component: AppIndexComponent },
  { path: '**', redirectTo: '' }
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
