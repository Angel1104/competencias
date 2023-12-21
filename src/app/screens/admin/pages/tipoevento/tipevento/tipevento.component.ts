import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api/api.service';
import { TipoEventoI } from "../../../../../models/tipoEvento.interface";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tipevento',
  templateUrl: './tipevento.component.html',
  styleUrls: ['./tipevento.component.css']
})
export class TipeventoComponent  implements OnInit {
  displayedColumns: string[] = ['nombre','acciones'];

  dataUser! : TipoEventoI;
  crearForm: FormGroup;
  tipoeventos: TipoEventoI[] = [];

  constructor(private apiService: ApiService,private router: Router, private fb: FormBuilder) {
    this.crearForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
    });
  }

  ngOnInit(): void {
    this.apiService.getTipoEventos().subscribe(data => {
        this.tipoeventos = data;
        console.log(this.tipoeventos);
    });
    
  } 

  crearTipoEvento(){
    console.log('Formulario válido:', this.crearForm.valid);
    if (this.crearForm.valid) {
    const datos = this.crearForm.value;
    const formData = new FormData();

    formData.append('nombre', datos.nombre);

    console.log(formData);
    Swal.fire({
      icon: 'success',
      title: 'Registrado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      console.log(formData);
      this.crear(formData);
        this.router.navigate(['/admin/tipoevento']);
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
    this.apiService.postCrearTipoEventos(data).subscribe(data=>{
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

  eliminarAdmin(id:number){
    Swal.fire({
      title: '¿Estás seguro de eliminar al tipo de evento ?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteTipoEventos(id).subscribe(data=>{
          console.log(data);
        })
        
        Swal.fire(
          'Eliminado!',
          'Se ha eliminado el tipo de evento con éxito',
          'success'
        ).then(() => {
          this.router.navigateByUrl('/admin/tipoevento', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/tipoevento']);
          });
        });
      }
    });
  }

  shouldDisableButton(id: number): boolean {
    return id === 1;
  }
    
  
}
