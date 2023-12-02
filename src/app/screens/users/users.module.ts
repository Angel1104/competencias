import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomComponent } from './pages/hom/hom.component';
import { CompComponent } from './pages/comp/comp.component';
import { VerevenComponent } from './pages/vereven/vereven.component';
import { EvenComponent } from './pages/even/even.component';
import { VercompComponent } from './pages/vercomp/vercomp.component';

import { UsersRoutingModule } from './users-routing.module';

import { ReactiveFormsModule } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../../Reutilizable/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RegistroequipoComponent } from './pages/registroequipo/registroequipo.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegistrointeresadoComponent } from './pages/registrointeresado/registrointeresado.component';


@NgModule({
  declarations: [
    CompComponent,
    EvenComponent,
    VercompComponent,
    VerevenComponent,
    HomComponent,
    RegistroequipoComponent,
    RegistrointeresadoComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    SharedModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class UsersModule { }
