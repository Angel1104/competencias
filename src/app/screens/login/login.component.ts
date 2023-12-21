import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api/api.service";

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  errorMsg: string = '';
  loading: boolean = false;
  hidePassword: boolean = true;


  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, 
    private router: Router,
    public dialog: MatDialog
    ){}

  ngOnInit(): void {
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(form: any) {
    this.loading = true;
    this.api.loginByEmail(form).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error(error);
        this.errorMsg = 'Error al intentar iniciar sesión como ADMINISTRADOR. Verifica tus credenciales.';
      }
    ).add(() => {
      this.loading = false;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { message: 'Por favor enviar mensaje al siguiente correo para recuperar contraseña: ' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  
}
