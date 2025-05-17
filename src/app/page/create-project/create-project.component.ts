import { Component } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputFormComponent } from '../../components/custom-input-form/custom-input-form.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-project',
  imports: [StandartComponent, ReactiveFormsModule, CustomInputFormComponent, CommonModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  createProjectForm = new FormGroup({
    name:          new FormControl('', [Validators.required]),
    description:   new FormControl('', [Validators.required]),
    category:      new FormControl('', [Validators.required]),
    experience:    new FormControl(''),
    technologies:  new FormControl(''),
    startDate:     new FormControl(null, [Validators.required]),
    estimatedTime: new FormControl(''),
    vacancy:       new FormControl('', [Validators.required]),
    repository:    new FormControl('')
  });

  submitProject(event: Event) {
    console.log(this.createProjectForm.controls.name.value)
    console.log(this.createProjectForm.controls.description.value)
    console.log(this.createProjectForm.controls.category.value)
    console.log(this.createProjectForm.controls.experience.value)
    console.log(this.createProjectForm.controls.technologies.value)
    console.log(this.createProjectForm.controls.startDate.value)
    console.log(this.createProjectForm.controls.estimatedTime.value)
    console.log(this.createProjectForm.controls.repository.value)
  }

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

  techArr: string[] = [];
  expArr: string[] = [];

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
}
