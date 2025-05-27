import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StandartComponent } from '../../template/standart/standart.component';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserServiceService } from '../../services/user-service.service';
import { IUserProfile } from '../../utils/dto/user.dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditMemberModalComponent } from '../../components/edit-member-modal/edit-member-modal.component';

@Component({
  selector: 'app-project',
  imports: [StandartComponent, DatePipe, CommonModule, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  uid!: string;
  projectBody!: ProjectTypeUid;
  creatorId!: string;
  canAcess!: boolean;
  currentUserUid!: string;
  available!: number;
  members: [string, string][] = [];

  categoryMap = [
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
  currentCategory!: string;
  

  constructor(readonly route: ActivatedRoute, readonly router: Router ,readonly projectService: ProjectService, readonly authSerice: AuthService, readonly userService: UserServiceService, readonly modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    
    this.projectBody = await this.projectService.getProjectByUid(this.uid) as ProjectTypeUid;
    // localStorage.setItem('project', JSON.stringify(this.projectBody))
    // this.projectBody = JSON.parse(localStorage.getItem('project')!) as ProjectTypeUid

    this.creatorId = this.projectBody.userRef._key.path.segments[6] as string
    
    try {
      this.currentUserUid = JSON.parse(sessionStorage.getItem('profile')!).uid as string
    } catch (error) {
      console.log(error)
    }

    ((this.creatorId === this.currentUserUid)) ? this.canAcess = false : this.canAcess = true;
    
    this.available = this.projectBody.vancancy - this.projectBody.members.length;

    for (let memberUid of this.projectBody.members){
      const memberName = await this.userName(memberUid);
      this.members.push([memberName, memberUid])
    }

  }

  async saveProject(){
    if (!this.authSerice.isLogged()){
      this.router.navigate(['/login']);
      return;
    }
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
  
  async userName(uid: string){
    const user = await this.userService.getUser(uid) as IUserProfile;
    return user.name;
  }

  open(){
    this.modalService.open(EditMemberModalComponent)
  }

}
