import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';

import { EventosComponent } from './pages/eventos/eventos.component';
import { CreareventoComponent } from './pages/crearevento/crearevento.component';
import { VisualizareventoComponent } from './pages/visualizarevento/visualizarevento.component';
import { EditareventoComponent } from './pages/editarevento/editarevento.component';

import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { CrearcompComponent } from './pages/crearcomp/crearcomp.component';
import { VisualizarcompComponent } from './pages/visualizarcomp/visualizarcomp.component';
import { EditarcompComponent } from './pages/editarcomp/editarcomp.component';

import { VerinteresadosComponent } from './pages/verinteresados/verinteresados.component';
import { VerparticipantesComponent } from './pages/verparticipantes/verparticipantes.component';
import { VerequiposComponent } from './pages/verequipos/verequipos.component';

import { UsersviewComponent } from "./pages/usersview/usersview.component";
import { UsercreateComponent } from "./pages/usercreate/usercreate.component";

import { NotifeventComponent } from './pages/notifevent/notifevent.component';
import { NotifcompComponent } from './pages/notifcomp/notifcomp.component';

const routes: Routes = [{
    path:"", component: AdminComponent,
    children: [
      {path: "", component:HomeComponent},
      {path: "competencias", component:CompetenciasComponent},
      {path: "eventos", component:EventosComponent},
      {path: "crearevento", component:CreareventoComponent},
      {path: "visualizarevento/:id", component:VisualizareventoComponent},
      {path: "editarevento/:id", component:EditareventoComponent},
      {path: "crearcompetencia", component:CrearcompComponent},
      {path: "visualizarcompetencia/:id", component:VisualizarcompComponent},
      {path: "editarcompetencia/:id", component:EditarcompComponent},
      {path: "verinteresados/:id", component:VerinteresadosComponent},
      {path: "verparticipantes/:id", component:VerparticipantesComponent},
      {path: "verequipos/:id", component:VerequiposComponent},
      {path: "users", component: UsersviewComponent},
      {path: "crearuser", component: UsercreateComponent},
      {path: "reportevent/:id", component: NotifeventComponent},
      {path: "reportcomp/:id", component: NotifcompComponent},

    ]
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }