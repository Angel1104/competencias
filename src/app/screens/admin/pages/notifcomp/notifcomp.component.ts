import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { CompEditI } from "../../../../models/competenciaCompEdit.interface";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-notifcomp',
  templateUrl: './notifcomp.component.html',
  styleUrls: ['./notifcomp.component.css']
})
export class NotifcompComponent implements OnInit {
  constructor(private router: Router, private activaterouter: ActivatedRoute, private apiService: ApiService) {}

  dataCompetencia! : CompEditI;

  editarForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    encargado: new FormControl(''),
    fechaFin: new FormControl(''),
    fechaIni: new FormControl(''),
    requisitos: new FormControl(''),
    lugar: new FormControl(''),
    id_tipoCompetencias : new FormControl(''),
    estado: new FormControl(''),
    costo: new FormControl(''),
    horarios: new FormControl(''),
    email: new FormControl(''),
    umss: new FormControl(''),
    reporte: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{4,100}$/)]),
  });
//controles
  getReporteErrorMessage() {
    const rep = this.editarForm.get('reporte');
    if (!rep) {return 'Error en el formulario';}
    if (rep.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return rep.hasError('pattern') ? 'La descipcion debe tener entre 4 y 300 caracteres' : '';
  }
//fin
ngOnInit(): void {
  let competenciasEditId = this.activaterouter.snapshot.paramMap.get('id');
  if (competenciasEditId !== null) {
    this.getData(parseInt(competenciasEditId, 10));
  } else {
    this.getData(0);
  }
  console.log(competenciasEditId);
}

getData(id: Number) {
  this.apiService.getCompetenciasById(id).subscribe(data=>{
    const { imagen, ...competenciasSinImagen } = data;

    this.dataCompetencia = competenciasSinImagen;

    const reporteValor = this.dataCompetencia.reporte ? '' : this.dataCompetencia.reporte;

    this.editarForm.setValue({
      'nombre': this.dataCompetencia.nombre || '',
      'descripcion': this.dataCompetencia.descripcion || '',
      'encargado': this.dataCompetencia.encargado || '',
      'fechaFin': this.dataCompetencia.fechaFin || '',
      'fechaIni': this.dataCompetencia.fechaIni || '',
      'requisitos': this.dataCompetencia.requisitos || '',
      'lugar': this.dataCompetencia.lugar || '',
      'id_tipoCompetencias': this.dataCompetencia?.id_tipoCompetencias?.toString() || '',
      'estado': this.dataCompetencia.estado || '',
      'horarios': this.dataCompetencia.horarios || '',
      'email': this.dataCompetencia.email || '',
      'umss': this.dataCompetencia.umss || '',
      'costo': this.dataCompetencia.costo.toString() || '',
      'reporte': reporteValor,
    });
    console.log(this.editarForm.value);
  });
}

submit(datos: any) {
  console.log(datos);
}

editarCompetencia(form: any, id: Number) {
  console.log(form);
  console.log(id);
  console.log(this.editarForm.valid);
  if (this.editarForm.valid) {
    this.editar(form, id);
    Swal.fire({
      icon: 'success',
      title: 'Se ha enviado la notificación con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.reportar(form, id);
      this.router.navigate(['/admin/competencias']);
      
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay errores en el formulario. Por favor, verifica los campos.',
    });
  }
}

editar(data:any,id:Number){
  this.apiService.putCompetencia(data,id).subscribe(data=>{
    console.log(data);
  })
}
reportar(data: any, id: Number) {
  if (this.editarForm.get('id_tipoCompetencias')?.value === '1') {
    this.apiService.enviarcorreoCompInd(data, id).subscribe(data => {
      console.log(data);
    });
  } else {
    this.apiService.enviarcorreoCompGru(data, id).subscribe(data => {
      console.log(data);
    });
  }
}
}
