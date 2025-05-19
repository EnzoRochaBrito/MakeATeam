import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-project',
  imports: [StandartComponent, DatePipe, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  uid!: string;
  projectBody!: ProjectTypeUid;
  creatorId!: string;
  canAcess: boolean = true;
  currentUserUid!: string;

  categoryMap = [
    'Desenvolvimento Web',
    'Desenvolvimnto Mobile',
    'Inteligência Artificial',
    'Desenvolvimnto de Jogos',
    'IoT',
    'Outros'
  ]
  currentCategory!: string;

  constructor(readonly route: ActivatedRoute, readonly router: Router ,readonly projectService: ProjectService, readonly authSerice: AuthService, readonly userService: UserServiceService) { }

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    
    // this.projectBody = await this.projectService.getProjectByUid(this.uid) as ProjectTypeUid;
    // localStorage.setItem('project', JSON.stringify(this.projectBody))
    this.projectBody = JSON.parse(localStorage.getItem('project')!) as ProjectTypeUid

    this.creatorId = this.projectBody.userRef._key.path.segments[6] as string
    
    this.currentUserUid = JSON.parse(localStorage.getItem('profile')!).uid as string

    console.log(this.currentUserUid)

    if ((this.creatorId == this.currentUserUid)) {
      this.canAcess = false;
    }

  }

  async saveProject(){
    if (!this.authSerice.isLogged()){
      this.router.navigate(['/login']);
      return;
    }
    console.log(this.uid)
    await this.userService.saveProject(this.uid, this.currentUserUid)
    return
  }

  async memberResquest(){
    if (!this.authSerice.isLogged()){
      this.router.navigate(['/login']);
      return;
    }
    await this.projectService.sendMemberRequest(this.uid);
  }
  

}
