import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { EventoI } from "../../../../models/eventoComp.interface";

@Component({
  selector: 'app-vereven',
  templateUrl: './vereven.component.html',
  styleUrls: ['./vereven.component.css']
})
export class VerevenComponent implements OnInit {
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}

  evento!:EventoI;

  tiposEventos: { [key: string]: string } = {
    '1': 'Entrenamiento',
    '2': 'Reclutamiento',
    '3': 'Clasificatorias Internas',
    '4': 'Competencia de entrenamiento para la ICPC',
  };

  ngOnInit(): void {
      let eventoId = this.activaterouter.snapshot.paramMap.get('id');
      if (eventoId !== null) {
        this.getData(parseInt(eventoId, 10));
      } else {
        this.getData(0);
      }
      console.log(eventoId);
  }

  
  getData(id:Number){
    this.apiService.getEventById(id).subscribe(data=>{
      this.evento = data;
      console.log(this.evento);
      
    })
  }

  registrarInteresado(id:Number, umss: string){
    console.log(umss);
    if (umss.toLowerCase() === 'si') {
      this.router.navigate(['/users/registointeresadoumss',id]);
    } else {
      this.router.navigate(['/users/registointeresado',id]);
    }
  }

}
