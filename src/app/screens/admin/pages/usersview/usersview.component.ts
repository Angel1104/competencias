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
  displayedColumns: string[] = ['nombre', 'email','acciones'];

  dataUser! : LoginI;
  crearForm: FormGroup;
  users: UserI[] = [];

  constructor(private apiService: ApiService,private router: Router, private fb: FormBuilder) {
    this.crearForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],

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
    return n.hasError('pattern') ? 'El nombre debe tener entre 3 y 50 caracteres, y no permite caracteres especiales como ser: - _ ! # % ( ) , . :' : '';
  }
  getEmailErrorMessage() {
    const e = this.crearForm.get('email');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return e.hasError('pattern') ? 'El email debe ser válido' : '';
  }
  getPassErrorMessage() {
    const e = this.crearForm.get('password');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return e.hasError('minlength') ? 'El password es minimo 6 caracteres' : '';
  }

  eliminarAdmin(id:number){
    Swal.fire({
      title: '¿Estás seguro de eliminar al usuario ?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(id).subscribe(data=>{
          console.log(data);
        })
        
        Swal.fire(
          'Eliminado!',
          'Se ha eliminado el usuario con éxito',
          'success'
        ).then(() => {
          // this.router.navigate(['/admin/users']);
          this.router.navigateByUrl('/admin/users', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/users']);
          });
        });
      }
    });
  }

  shouldDisableButton(id: number): boolean {
    return id === 1;
  }
    
  
}



