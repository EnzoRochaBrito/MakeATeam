import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'project-preview',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.css'
})
export class ProjectPreviewComponent implements OnInit {

  @Input() uid!: string;
  @Input() isMyProject: boolean = false;
  project!: ProjectTypeUid;

  constructor(readonly projectService: ProjectService){
  }
  
  async ngOnInit() {
    this.project = await this.projectService.getProjectByUid(this.uid) as ProjectTypeUid
  }

}
