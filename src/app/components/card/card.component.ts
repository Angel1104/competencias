import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../services/events.service';

export interface Event {
  title: string;
  image: string;
  description: string;
  date: string;
  location: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  events!: Array<Event>;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.events = [
      {
        "title": "Concurso de programación",
        "image": "assets/images/event.jpg",
        "description": "Un concurso de programación para estudiantes de todo el mundo.",
        "date": "2023-10-20",
        "location": "La Paz, Bolivia"
      },
      {
        "title": "Hackatón de desarrollo web",
        "image": "assets/images/event.jpg",
        "description": "Un hackatón de 24 horas para desarrollar proyectos web.",
        "date": "2023-11-05",
        "location": "Santa Cruz de la Sierra, Bolivia"
      },
      {
        "title": "Conferencia sobre inteligencia artificial",
        "image": "assets/images/event.jpg",
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
