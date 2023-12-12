import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { LoginI } from "../../../../models/login.interface";
import { UserI } from "../../../../models/user.interface";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usersview',
  templateUrl: './usersview.component.html',
  styleUrls: ['./usersview.component.css']
})
export class UsersviewComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'email'];

  dataUser! : LoginI;
  crearForm: FormGroup;
  users: UserI[] = [];

  constructor(private apiService: ApiService,private router: Router, private fb: FormBuilder) {
    this.crearForm = this.fb.group({
      nombre : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(data => {
        this.users = data;
        console.log(this.users);
    });
  } 

  crearUser(){
    console.log('Formulario válido:', this.crearForm.valid);
    if (this.crearForm.valid) {
    const datos = this.crearForm.value;
    const formData = new FormData();

    formData.append('nombre', datos.nombre);
    formData.append('email', datos.email);
    formData.append('password', datos.password);

    console.log(formData);
    Swal.fire({
      icon: 'success',
      title: 'Registrado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      console.log(formData);
      this.crear(formData);
        this.router.navigate(['/admin/users']);
    });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario. Por favor, verifica los campos.',
      });
    }
  }
  crear(data:any){
    this.apiService.createUser(data).subscribe(data=>{
      console.log(data);
    })
  }

  //Controles
  getNombreErrorMessage() {
    const n = this.crearForm.get('nombre');
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getEmailErrorMessage() {
    const e = this.crearForm.get('email');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getPassErrorMessage() {
    const e = this.crearForm.get('password');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
}



