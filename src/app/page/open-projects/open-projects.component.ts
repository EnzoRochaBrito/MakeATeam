import { Component, OnInit } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ProjectType, ProjectTypeUid } from '../../utils/type/project.type';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { OrderByDirection } from '@angular/fire/firestore';

@Component({
  selector: 'app-open-projects',
  imports: [StandartComponent, ProjectCardComponent, FormsModule, CommonModule],
  templateUrl: './open-projects.component.html',
  styleUrl: './open-projects.component.css'
})
export class OpenProjectsComponent implements OnInit {
  tags = ['React', 'Node', 'Typescript', 'Typescript','Typescript']

  constructor(private readonly projectService: ProjectService) { }
  
  experience:   string = '*';
  category:     string = '*';
  searchedTech: string = '';
  order:        OrderByDirection = 'desc';
  projectArr:   ProjectTypeUid[] = [];

  async filterSearch(){
    this.projectArr = await this.projectService.searchProject(this.experience, this.category, [], this.order);
  }

  async searchByTech(){
    const searchArr: string[] = this.searchedTech.toLowerCase().split(' ') 
    this.projectArr = await this.projectService.searchProject(this.experience, this.category, searchArr, this.order);
  }

  async ngOnInit(): Promise<void> {
    this.projectArr = await this.projectService.searchProject();
    // this.projectArr = [{
    //   name: 'test',
    //   category: 1,
    //   createdAt: Date.now(),
    //   uid: '123123',
    //   description: 'Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. ',
    //   experience: ['Junior'],
    //   technologies: ['teste', 'abc'],
    //   startDate: 'now',
    //   estimtedTime: 13,
    //   vancancy: 23,
    //   repository: '',
    //   userRef: '1230-231',
    //   creator: 'Enzo Rocha Brito'
    // }]
  }
  

}
