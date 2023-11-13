import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { CrearcompComponent } from './pages/crearcomp/crearcomp.component';
import { EditarcompComponent } from './pages/editarcomp/editarcomp.component';
import { VisualizarcompComponent } from './pages/visualizarcomp/visualizarcomp.component';

import { ReactiveFormsModule } from '@angular/forms'; 
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../Reutilizable/shared/shared.module';
import { VisualizareventoComponent } from './pages/visualizarevento/visualizarevento.component';
import { CreareventoComponent } from './pages/crearevento/crearevento.component';
import { EditareventoComponent } from './pages/editarevento/editarevento.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CompetenciasComponent,
    EventosComponent,
    CrearcompComponent,
    EditarcompComponent,
    VisualizarcompComponent,
    VisualizareventoComponent,
    CreareventoComponent,
    EditareventoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminModule { }
