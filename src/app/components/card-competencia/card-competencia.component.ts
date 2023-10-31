import { Component } from '@angular/core';
import { EventsService } from './../../services/events.service';

export interface Event {
  title: string;
  image: string;
  description: string;
  date: string;
  location: string;
}

@Component({
  selector: 'app-card-competencia',
  templateUrl: './card-competencia.component.html',
  styleUrls: ['./card-competencia.component.css']
})
export class CardCompetenciaComponent {
  events!: Array<Event>;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.events = [
      {
        "title": "Concurso de programación",
        "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
        "description": "Un concurso de programación para estudiantes de todo el mundo.",
        "date": "2023-10-20",
        "location": "La Paz, Bolivia"
      },
      {
        "title": "Hackatón de desarrollo web",
        "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
        "description": "Un hackatón de 24 horas para desarrollar proyectos web.",
        "date": "2023-11-05",
        "location": "Santa Cruz de la Sierra, Bolivia"
      },
      {
        "title": "Conferencia sobre inteligencia artificial",
        "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg",
        "description": "Una conferencia sobre los últimos avances en inteligencia artificial.",
        "date": "2023-12-02",
        "location": "Cochabamba, Bolivia"
      }
    ];
  }

  getEvents() {
    return this.events;
  }
}
