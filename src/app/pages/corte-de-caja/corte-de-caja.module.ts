import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorteDeCajaPageRoutingModule } from './corte-de-caja-routing.module';

import { CorteDeCajaPage } from './corte-de-caja.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorteDeCajaPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CorteDeCajaPage]
})
export class CorteDeCajaPageModule {}
