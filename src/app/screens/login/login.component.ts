import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api/api.service";
import { LoginI } from "../../models/login.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

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

}
