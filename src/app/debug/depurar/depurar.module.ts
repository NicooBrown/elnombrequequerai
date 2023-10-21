import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepurarPageRoutingModule } from './depurar-routing.module';

import { DepurarPage } from './depurar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepurarPageRoutingModule
  ],
  declarations: [DepurarPage]
})
export class DepurarPageModule {}
