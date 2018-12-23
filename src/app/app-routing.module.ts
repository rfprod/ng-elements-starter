import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppIndexComponent } from './components/app-index/app-index.component';

const routes: Routes = [
  { path: '', component: AppIndexComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
