import { Component } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputFormComponent } from '../../components/custom-input-form/custom-input-form.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { CreateProjectDTO } from '../../utils/dto/create.project.dto';
import { RequiredTech } from '../../validators/required-project-tech.validator';
import { RequiredExp } from '../../validators/required-project-exp.validator';


@Component({
  selector: 'app-create-project',
  imports: [StandartComponent, ReactiveFormsModule, CustomInputFormComponent, CommonModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  
  techArr: string[] = [];
  expArr: string[] = [];

  constructor(readonly authService: AuthService, readonly projectService: ProjectService, readonly route: Router) {}

  createProjectForm = new FormGroup({
    name:          new FormControl('',   [Validators.required]),
    description:   new FormControl('',   [Validators.required]),
    category:      new FormControl('',   [Validators.required, Validators.min(1)]),
    experience:    new FormControl(''),
    technologies:  new FormControl(''),
    startDate:     new FormControl('',   [Validators.required]),
    estimatedTime: new FormControl('',   [Validators.min(1)]),
    vacancy:       new FormControl('',   [Validators.required, Validators.min(1)]),
    repository:    new FormControl('')
  },
  [RequiredTech.requiredTech(this.techArr), RequiredExp.requiredExp(this.expArr)] 
);

  projectCategory = [
    'Desenvolvimento Web',
    'Desenvolvimento Mobile',
    'Inteligência Artificial',
    'Desenvolvimento de Jogos',
    'IoT',
    'Outros'
  ];

  experienceLevel = [
    'Iniciante',
    'Intermediário',
    'Avançado'
  ];


  removeTag(index: number){
    this.techArr.splice(index, 1);
  }

  addTag(){
    const value: string = this.createProjectForm.controls.technologies.value as string;
    if (value){
      this.techArr.push(value.trim())
      this.createProjectForm.controls.technologies.setValue('')
    }
  }

  removeEx(index: number){
    this.experienceLevel.push(this.expArr[index]);
    this.expArr.splice(index, 1);
  }
  
  addEx(event: Event){
    const tar: HTMLInputElement = event.target as HTMLInputElement;
    const value: number = Number(tar.value);
    
    this.expArr.push(this.experienceLevel[ value ]);
    this.experienceLevel.splice(value, 1);
  }

  async postProject(){

    const post: CreateProjectDTO = {
      name: this.createProjectForm.controls.name.value as string,
      description: this.createProjectForm.controls.description.value as string,
      category: Number(this.createProjectForm.controls.category.value),
      estimtedTime: Number(this.createProjectForm.controls.estimatedTime.value),
      experience: this.expArr,
      repository: this.createProjectForm.controls.repository.value as string,
      startDate: this.createProjectForm.controls.startDate.value as string,
      technologies: this.techArr,
      vancancy: Number(this.createProjectForm.controls.vacancy.value)
    }

    await this.projectService.createProject(post)
    this.route.navigate(['/open'])
  }
}
