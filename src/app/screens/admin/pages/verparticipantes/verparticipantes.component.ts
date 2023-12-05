import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { InteresadoI } from "../../../../models/interesadoComp.interface";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verparticipantes',
  templateUrl: './verparticipantes.component.html',
  styleUrls: ['./verparticipantes.component.css']
})
export class VerparticipantesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellidos', 'ci', 'fecha_Nacimiento', 'telefono', 'email', 'carrera', 'semestre', 'codSIS'];

  interesados: InteresadoI[] = [];

  constructor(private apiService: ApiService,private activaterouter:ActivatedRoute) {}

  ngOnInit(): void {
    let compId = this.activaterouter.snapshot.paramMap.get('id');
    if (compId !== null) {
      this.apiService.getParticipanteByCompId(parseInt(compId,10)).subscribe(data => {
        this.interesados = data;
        console.log("estos son los interesados");
        console.log(this.interesados);
      });
    } else {
      
    }
  }

}
