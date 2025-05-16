import { Component } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-open-projects',
  imports: [StandartComponent, ProjectCardComponent],
  templateUrl: './open-projects.component.html',
  styleUrl: './open-projects.component.css'
})
export class OpenProjectsComponent {
  tags = ['React', 'Node', 'Typescript', 'Typescript','Typescript']
}
