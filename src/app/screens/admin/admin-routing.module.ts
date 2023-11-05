import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { EventosComponent } from './pages/eventos/eventos.component';
import { CreareventoComponent } from './pages/crearevento/crearevento.component';
import { VisualizareventoComponent } from './pages/visualizarevento/visualizarevento.component';
import { EditareventoComponent } from './pages/editarevento/editarevento.component';

import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { CrearcompComponent } from './pages/crearcomp/crearcomp.component';
import { VisualizarcompComponent } from './pages/visualizarcomp/visualizarcomp.component';
import { EditarcompComponent } from './pages/editarcomp/editarcomp.component';

const routes: Routes = [{
    path:"", component: AdminComponent,
    children: [
      {path: "competencias", component:CompetenciasComponent},
      {path: "eventos", component:EventosComponent},
      {path: "crearevento", component:CreareventoComponent},
      {path: "visualizarevento/:id", component:VisualizareventoComponent},
      {path: "editarevento/:id", component:EditareventoComponent},
      {path: "crearcompetencia", component:CrearcompComponent},
      {path: "visualizarcompetencia/:id", component:VisualizarcompComponent},
      {path: "editarcompetencia/:id", component:EditarcompComponent},
    ]
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }