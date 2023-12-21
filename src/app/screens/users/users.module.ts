import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { RegistroindivComponent } from './pages/registroindiv/registroindiv.component';
import { RegistroindivumssComponent } from './pages/registroindivumss/registroindivumss.component';
import { RegistroequipoumssComponent } from './pages/registroequipoumss/registroequipoumss.component';
import { RegistrointeresadoumssComponent } from './pages/registrointeresadoumss/registrointeresadoumss.component';
import { Hom2Component } from './pages/hom2/hom2.component';


@NgModule({
  declarations: [
    CompComponent,
    EvenComponent,
    VercompComponent,
    VerevenComponent,
    RegistroequipoComponent,
    RegistrointeresadoComponent,
    RegistroindivComponent,
    RegistroindivumssComponent,
    RegistroequipoumssComponent,
    RegistrointeresadoumssComponent,
    Hom2Component
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
