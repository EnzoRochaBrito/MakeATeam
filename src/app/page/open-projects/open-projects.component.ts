import { Component, OnInit } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ProjectType, ProjectTypeUid } from '../../utils/type/project.type';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { OrderByDirection } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-open-projects',
  imports: [StandartComponent, ProjectCardComponent, FormsModule, CommonModule],
  templateUrl: './open-projects.component.html',
  styleUrl: './open-projects.component.css'
})
export class OpenProjectsComponent implements OnInit {

  constructor(private readonly projectService: ProjectService) { }

  projectCategory = [
    'Desenvolvimento Web',
    'Desenvolvimento Mobile',
    'Desenvolvimento Desktop',
    'Multi-Plataforma',
    'Inteligência Artificial',
    'Desenvolvimnto de Jogos',
    'Realidade Aumentada',
    'IoT',
    'Outros'
  ]
  
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
  }
  

}
