import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

import { HomComponent } from './pages/hom/hom.component';
import { CompComponent } from './pages/comp/comp.component';
import { VerevenComponent } from './pages/vereven/vereven.component';
import { EvenComponent } from './pages/even/even.component';
import { VercompComponent } from './pages/vercomp/vercomp.component';

const routes: Routes = [{
    path:"", component: UsersComponent,
    children: [
      {path: "", component:HomComponent},
      {path: "competencias", component:CompComponent},
      {path: "eventos", component:EvenComponent},
      {path: "visualizarevento/:id", component:VerevenComponent},
      {path: "visualizarcompetencia/:id", component:VercompComponent},
      
    ]
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }