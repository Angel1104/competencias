import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { EquipoI } from "../../../../models/equipoComp.interface";

@Component({
  selector: 'app-verequipos',
  templateUrl: './verequipos.component.html',
  styleUrls: ['./verequipos.component.css'],
})
export class VerequiposComponent implements OnInit {

  constructor(private apiService: ApiService) {}
  
  searchTerm: string = '';
  filteredEquipos: EquipoI[] = [];
  equipos!: EquipoI[];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getAllEquipos().subscribe(data => {
      this.equipos = data;
      this.filterTeams();
      console.log(this.equipos);
    });
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
