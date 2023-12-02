import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { InteresadoI } from "../../../../models/interesadoComp.interface";

@Component({
  selector: 'app-verinteresados',
  templateUrl: './verinteresados.component.html',
  styleUrls: ['./verinteresados.component.css']
})
export class VerinteresadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellidos', 'ci', 'fecha_Nacimiento', 'telefono', 'email', 'carrera', 'semestre', 'codSIS'];

  interesados: InteresadoI[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllInteresados().subscribe(data => {
      this.interesados = data;
      console.log(this.interesados);
    });
  }
}