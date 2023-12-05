import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { EquipoI } from "../../../../models/equipoComp.interface";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verequipos',
  templateUrl: './verequipos.component.html',
  styleUrls: ['./verequipos.component.css'],
})
export class VerequiposComponent implements OnInit {

  constructor(private apiService: ApiService,private activaterouter:ActivatedRoute) {}
  
  searchTerm: string = '';
  filteredEquipos: EquipoI[] = [];
  equipos!: EquipoI[];

  ngOnInit(): void {
    let compId = this.activaterouter.snapshot.paramMap.get('id');
    if (compId !== null) {
      this.apiService.getAllEquiposByComId(parseInt(compId,10)).subscribe(data => {
        this.equipos = data;
        this.filterTeams();
        console.log(this.equipos);
      });
    } else {
      
    }
  }

  filterTeams() {
    if (!this.searchTerm.trim()) {
      return;
    }
  
    this.filteredEquipos = this.equipos.filter(equipo =>
      equipo.nombreLider.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
