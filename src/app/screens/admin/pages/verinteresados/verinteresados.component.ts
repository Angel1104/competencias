import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { InteresadoI } from "../../../../models/interesadoComp.interface";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verinteresados',
  templateUrl: './verinteresados.component.html',
  styleUrls: ['./verinteresados.component.css']
})
export class VerinteresadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellidos', 'ci', 'fecha_Nacimiento', 'telefono', 'email', 'carrera', 'semestre', 'codSIS'];

  interesados: InteresadoI[] = [];

  constructor(private apiService: ApiService,private activaterouter:ActivatedRoute) {}

  ngOnInit(): void {
    let evenId = this.activaterouter.snapshot.paramMap.get('id');
    if (evenId !== null) {
      this.apiService.getInteresadosByEventoId(parseInt(evenId,10)).subscribe(data => {
        this.interesados = data;
        console.log(this.interesados);
      });
    } else {
      
    }
  }
}