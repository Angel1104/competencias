import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CompetenciaI } from 'src/app/models/competenciaComp.interface';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-crearcomp',
  templateUrl: './crearcomp.component.html',
  styleUrls: ['./crearcomp.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class CrearcompComponent {

  crearForm: FormGroup;
  imagenSeleccionada: File | null = null;
  dataCompetencia! : CompetenciaI;

  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
  
    this.crearForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
      estado: [false, Validators.required],
    });
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
  //fin
  crearCompetencia(){
    console.log('Formulario válido:', this.crearForm.valid);
    if (this.crearForm.valid) {
    const datos = this.crearForm.value;

    const estado = datos.estado ? 'Activo' : 'Inactivo';
    
    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('estado', estado);

    console.log(formData);
    Swal.fire({
      icon: 'success',
      title: 'Competencia creada exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
        this.crear(formData);
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
    this.apiService.postCompetencia(data).subscribe(data=>{
      window.location.href = '/admin/competencias';
    })
  }

}
