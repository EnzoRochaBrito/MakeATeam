import { Component, OnInit } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ProjectType, ProjectTypeUid } from '../../utils/type/project.type';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-open-projects',
  imports: [StandartComponent, ProjectCardComponent, FormsModule, CommonModule],
  templateUrl: './open-projects.component.html',
  styleUrl: './open-projects.component.css'
})
export class OpenProjectsComponent implements OnInit {
  tags = ['React', 'Node', 'Typescript', 'Typescript','Typescript']

  constructor(private readonly projectService: ProjectService) { }
  
  experience: string = '*';
  category:   string = '*';
  projectArr: ProjectTypeUid[] = [];

  filterSearch(){

  }

  async ngOnInit(): Promise<void> {
    // this.projectArr = await this.projectService.searchProject();
    this.projectArr = [{
      name: 'test',
      category: 1,
      createdAt: Date.now(),
      uid: '123123',
      description: 'Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. ',
      experience: ['Junior'],
      technologies: ['teste', 'abc'],
      startDate: 'now',
      estimtedTime: 13,
      vancancy: 23,
      repository: '',
      userRef: '1230-231',
      creator: 'Enzo Rocha Brito'
    }]
  }
  

}
