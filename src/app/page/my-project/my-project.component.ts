import { Component, OnInit } from '@angular/core';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';
import { ProjectPreviewComponent } from '../../widget/project-preview/project-preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-project',
  imports: [StandartComponent, ProjectPreviewComponent, CommonModule],
  templateUrl: './my-project.component.html',
  styleUrl: './my-project.component.css'
})
export class MyProjectComponent implements OnInit {

  userProjectsArr: ProjectTypeUid[] = [];
  userProjectsId: string[] = []
  

  constructor(readonly projectService: ProjectService){ }

  async ngOnInit() {
    this.userProjectsId = JSON.parse(sessionStorage.getItem('profile')!).projectsOwned
    for (let uid of this.userProjectsId){
      const project: ProjectTypeUid = await this.projectService.getProjectByUid(uid) as ProjectTypeUid;
      this.userProjectsArr.push(project);
    }
  }
}
