import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./screens/login/login.component";

const routes: Routes = [
  // {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'admin', loadChildren: ()=> import("./screens/admin/admin.module").then(x => x.AdminModule)},
  {path:'users', loadChildren: ()=> import("./screens/users/users.module").then(x => x.UsersModule)},
  // {path:'**',redirectTo:"login",pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }