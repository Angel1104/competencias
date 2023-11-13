import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { EventoEditI } from "../../../../models/evento.interface";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EventoI } from 'src/app/models/eventoComp.interface';

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
  selector: 'app-editarevento',
  templateUrl: './editarevento.component.html',
  styleUrls: ['./editarevento.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class EditareventoComponent implements OnInit {
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}

  // evento!:EventoEditI;
  dataEvento! : EventoI;
  editarForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    descripcion : new FormControl('',Validators.required),
    encargado : new FormControl('',Validators.required),
    fechaFin : new FormControl('',Validators.required),
    fechaIni : new FormControl('',Validators.required),
    requisitos : new FormControl('',Validators.required),
    lugar : new FormControl('',Validators.required),
    id_tipoEventos : new FormControl('',Validators.required),
  });

  ngOnInit(): void {
      let eventoEditId = this.activaterouter.snapshot.paramMap.get('id');
      if (eventoEditId !== null) {
        this.getData(parseInt(eventoEditId, 10));
      } else {
        this.getData(0);
      }
      console.log(eventoEditId);
  }

  getData(id:Number){
    this.apiService.getEventById(id).subscribe(data=>{
      // this.evento = data;
      this.dataEvento = data;
      this.editarForm.setValue({
        'nombre': this.dataEvento.nombre || '',
        'descripcion': this.dataEvento.descripcion || '',
        'encargado': this.dataEvento.encargado || '',
        'fechaFin': this.dataEvento.fechaFin || '',
        'fechaIni': this.dataEvento.fechaIni || '',
        'requisitos': this.dataEvento.requisitos || '',
        'lugar': this.dataEvento.lugar || '',
        'id_tipoEventos': this.dataEvento.id_tipoEventos.toString() || ''
      })
      console.log(this.editarForm.value);
    })
  }

  submit(datos: any){
    console.log(datos);
    
  }

  editarEvento(form:any, id:Number){
    console.log(form);
    console.log(id);
    
    Swal.fire({
      title: '¿Estás seguro de editar el evento?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.editar(form,id);
        Swal.fire(
          'Editado!',
          'Se ha editado el evento con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/eventos']);
        });
      }
    });
  }
  editar(data:EventoEditI,id:Number){
    this.apiService.putEvent(data,id).subscribe(data=>{
      console.log(data);
    })
  }
}
