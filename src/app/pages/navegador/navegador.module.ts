import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavegadorPageRoutingModule } from './navegador-routing.module';

import { NavegadorPage } from './navegador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavegadorPageRoutingModule
  ],
  declarations: [NavegadorPage]
})
export class NavegadorPageModule {}
