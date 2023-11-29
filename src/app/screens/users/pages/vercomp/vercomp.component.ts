import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { CompetenciaI } from "../../../../models/competenciaComp.interface";

@Component({
  selector: 'app-vercomp',
  templateUrl: './vercomp.component.html',
  styleUrls: ['./vercomp.component.css']
})
export class VercompComponent implements OnInit {
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}

  competencias!:CompetenciaI;

  ngOnInit(): void {
      let competenciasId = this.activaterouter.snapshot.paramMap.get('id');
      if (competenciasId !== null) {
        this.getData(parseInt(competenciasId, 10));
      } else {
        this.getData(0);
      }
      console.log(competenciasId);
  }

  getData(id:Number){
    this.apiService.getCompetenciasById(id).subscribe(data=>{
      this.competencias = data;
      console.log(this.competencias);
      
    })
  }

  registrarEquipo(id:Number){
    this.router.navigate(['users/registroequipo',id]);
  }
}
