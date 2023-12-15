import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { EventoEditI } from 'src/app/models/eventoCompEdit.interface';


@Component({
  selector: 'app-notifevent',
  templateUrl: './notifevent.component.html',
  styleUrls: ['./notifevent.component.css']
})
export class NotifeventComponent implements OnInit {
  constructor(private router: Router, private activaterouter: ActivatedRoute, private apiService: ApiService) {}

  dataEvento!: EventoEditI;

  editarForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    encargado: new FormControl(''),
    fechaFin: new FormControl(''),
    fechaIni: new FormControl(''),
    requisitos: new FormControl(''),
    lugar: new FormControl(''),
    id_tipoEventos: new FormControl(''),
    estado: new FormControl(''),
    costo: new FormControl(''),
    horarios: new FormControl(''),
    email: new FormControl(''),
    umss: new FormControl(''),
    reporte: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-|_|!|#|%(|),.\sñÑ]{4,300}$/)]),
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
  let eventoEditId = this.activaterouter.snapshot.paramMap.get('id');
  if (eventoEditId !== null) {
    this.getData(parseInt(eventoEditId, 10));
  } else {
    this.getData(0);
  }
  console.log(eventoEditId);
}

getData(id: Number) {
  this.apiService.getEventById(id).subscribe(data => {
    const { imagen, ...eventoSinImagen } = data;
    this.dataEvento = eventoSinImagen;

    const reporteValor = this.dataEvento.reporte ? '' : this.dataEvento.reporte;

    this.editarForm.setValue({
      'nombre': this.dataEvento.nombre || '',
      'descripcion': this.dataEvento.descripcion || '',
      'encargado': this.dataEvento.encargado || '',
      'fechaFin': this.dataEvento.fechaFin || '',
      'fechaIni': this.dataEvento.fechaIni || '',
      'requisitos': this.dataEvento.requisitos || '',
      'lugar': this.dataEvento.lugar || '',
      'id_tipoEventos': this.dataEvento.id_tipoEventos.toString() || '',
      'estado': this.dataEvento.estado || '',
      'horarios': this.dataEvento.horarios || '',
      'email': this.dataEvento.email || '',
      'umss': this.dataEvento.umss || '',
      'costo': this.dataEvento.costo.toString() || '',
      //'reporte': this.dataEvento.reporte || '',
      'reporte': reporteValor,
    });
    console.log(this.editarForm.value);
  });
}

submit(datos: any) {
  console.log(datos);
}

editarEvento(form: any, id: Number) {
  console.log(form);
  console.log(id);
  console.log(this.editarForm.valid);
  if (this.editarForm.valid) {
    Swal.fire({
      icon: 'success',
      title: 'Se ha editado el evento con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      //console.log(form.reporte);
      this.editar(form, id);
      //this.reportar(form, id);
      //this.reportar(form.reporte, id); // Pasa solo el valor del campo 'reporte'
      this.router.navigate(['/admin/eventos']);
      
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay errores en el formulario. Por favor, verifica los campos.',
    });
  }
}

editar(data: any, id: Number) {
  this.apiService.putEvent(data, id).subscribe(data => {
    console.log(data);
  });
}
reportar(data: any,id:Number){
  this.apiService.enviarcorreoEvent(data,id).subscribe(data=>{
    
    console.log(data);
  })
}
}
