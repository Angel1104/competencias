import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api/api.service";
import { LoginI } from "../../models/login.interface";

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  errorMsg: string = '';
  loading: boolean = false;


  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router: Router){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onLogin(form: any) {
    this.loading = true;
    this.api.loginByEmail(form).subscribe(
      (response) => {
        // Aquí puedes realizar acciones adicionales si es necesario
        console.log(response);
        this.router.navigate(['/admin']);

        /*
        // Verificar si la respuesta indica que el inicio de sesión fue exitoso
        if (response && response.token) {
          // Almacenar el token u otros datos de sesión según sea necesario

          this.router.navigate(['/admin']);
        } else {
          // Manejar el caso en el que el inicio de sesión no fue exitoso
          console.log('estoy aqui');
        }*/
      },
      (error) => {
        // Manejar errores de la llamada API
        console.error(error);
        this.errorMsg = 'Error al intentar iniciar sesión. Verifica tus credenciales.';
      }
    ).add(() => {
      // Deshabilita el estado de carga después de que la solicitud se complete (ya sea exitosa o con error)
      this.loading = false;
    });
  }
  
/*
  onLogin(form: any){
    console.log(form);
  }
  // onLogin(formValue: any) {
  //   if (formValue.email && formValue.password) {
  //     const loginData: LoginI = {
  //       email: formValue.email,
  //       password: formValue.password
  //     };
  //     this.api.loginByEmail(loginData);
  //     console.log(loginData);
  //   } else {
  //     // Manejar el caso donde los valores de email o password son undefined
  //   }
  // }
*/
}
