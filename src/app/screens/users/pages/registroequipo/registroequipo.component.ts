import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';

import { MAT_DATE_FORMATS } from '@angular/material/core';


@Component({
  selector: 'app-registroequipo',
  templateUrl: './registroequipo.component.html',
  styleUrls: ['./registroequipo.component.css'],
})
export class RegistroequipoComponent {
  
  /*
  formulario!: FormGroup;

  integrantes: any[] = []; // Puedes cambiar 'any' por un tipo de interfaz más específico
  integranteCount: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      integrante: this.fb.group({
        nombre: ['', Validators.required],
        email: ['', Validators.email],
        apellidos: [''],
        codigoSis: [''],
        carrera: ['']
      })
    });
  }

  agregarIntegrante() {
    this.integrantes.push({ ...this.formulario.value.integrante, numero: ++this.integranteCount });
    this.formulario.reset({ integrante: {} });
  }

  guardar() {
    // Puedes hacer algo con la lista de integrantes aquí
    console.log(this.integrantes);
  }*/
}