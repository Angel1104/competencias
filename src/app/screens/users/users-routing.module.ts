import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

import { HomComponent } from './pages/hom/hom.component';
import { CompComponent } from './pages/comp/comp.component';
import { VerevenComponent } from './pages/vereven/vereven.component';
import { EvenComponent } from './pages/even/even.component';
import { VercompComponent } from './pages/vercomp/vercomp.component';
import { RegistroequipoComponent } from './pages/registroequipo/registroequipo.component';
import { RegistroequipoumssComponent } from './pages/registroequipoumss/registroequipoumss.component';
import { RegistrointeresadoComponent } from './pages/registrointeresado/registrointeresado.component';
import { RegistrointeresadoumssComponent } from './pages/registrointeresadoumss/registrointeresadoumss.component';
import { RegistroindivComponent } from './pages/registroindiv/registroindiv.component';
import { RegistroindivumssComponent } from './pages/registroindivumss/registroindivumss.component';


const routes: Routes = [{
    path:"", component: UsersComponent,
    children: [
      {path: "", component:HomComponent},
      {path: "competencias", component:CompComponent},
      {path: "eventos", component:EvenComponent},
      {path: "visualizarevento/:id", component:VerevenComponent},
      {path: "visualizarcompetencia/:id", component:VercompComponent},
      {path: "registroequipo/:id", component:RegistroequipoComponent},
      {path: "registroequipoumss/:id", component:RegistroequipoumssComponent},
      {path: "registointeresado/:id", component:RegistrointeresadoComponent},
      {path: "registointeresadoumss/:id", component:RegistrointeresadoumssComponent},
      {path: "registoindiv/:id", component:RegistroindivComponent},
      {path: "registoindivumss/:id", component:RegistroindivumssComponent},
    ]
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }