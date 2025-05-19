import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [StandartComponent, DatePipe, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  uid!: string;
  projectBody!: ProjectTypeUid;
  categoryMap = [
    'Desenvolvimento Web',
    'Desenvolvimnto Mobile',
    'Inteligência Artificial',
    'Desenvolvimnto de Jogos',
    'IoT',
    'Outros'
  ]
  currentCategory!: string;

  constructor(private readonly route: ActivatedRoute, private readonly projectService: ProjectService) { }

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.projectBody = await this.projectService.getProjectByUid(this.uid) as ProjectTypeUid;
    console.log(this.projectBody);
  }
}
