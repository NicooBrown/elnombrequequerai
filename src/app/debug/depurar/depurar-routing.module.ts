import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepurarPage } from './depurar.page';

const routes: Routes = [
  {
    path: '',
    component: DepurarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepurarPageRoutingModule {}
