import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';

@Component({
  selector: 'project-preview',
  imports: [],
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.css'
})
export class ProjectPreviewComponent implements OnInit {

  @Input() uid!: string;
  project!: ProjectTypeUid;

  constructor(readonly projectService: ProjectService){
  }
  
  async ngOnInit() {
    this.project = await this.projectService.getProjectByUid(this.uid) as ProjectTypeUid
  }

}
