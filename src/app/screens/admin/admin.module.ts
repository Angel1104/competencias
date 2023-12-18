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


import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HomeComponent } from './pages/home/home.component';
import { VerinteresadosComponent } from './pages/verinteresados/verinteresados.component';
import { VerparticipantesComponent } from './pages/verparticipantes/verparticipantes.component';
import { VerequiposComponent } from './pages/verequipos/verequipos.component';
import { UsersviewComponent } from './pages/usersview/usersview.component';
import { NotifeventComponent } from './pages/notifevent/notifevent.component';
import { NotifcompComponent } from './pages/notifcomp/notifcomp.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ReportesEventosComponent } from './pages/reportes-eventos/reportes-eventos.component';
import { GanadorIndividualComponent } from './pages/ganador-individual/ganador-individual.component';
import { GanadorGrupalComponent } from './pages/ganador-grupal/ganador-grupal.component';


@NgModule({
  declarations: [
    CompetenciasComponent,
    EventosComponent,
    CrearcompComponent,
    EditarcompComponent,
    VisualizarcompComponent,
    VisualizareventoComponent,
    CreareventoComponent,
    EditareventoComponent,
    HomeComponent,
    VerinteresadosComponent,
    VerparticipantesComponent,
    VerequiposComponent,
    UsersviewComponent,
    NotifeventComponent,
    NotifcompComponent,
    ReportesComponent,
    ReportesEventosComponent,
    GanadorIndividualComponent,
    GanadorGrupalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminModule { }
