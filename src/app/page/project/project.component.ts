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
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-project',
  imports: [StandartComponent, DatePipe, CommonModule, RouterLink, FormsModule],
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

  currentTag: string = '';
  showTagModal: boolean = false;
  selectedUser!: [string, string];
  selectedTag!: string;

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
  

  constructor(readonly route: ActivatedRoute, readonly router: Router ,readonly projectService: ProjectService, readonly authSerice: AuthService, readonly userService: UserServiceService) { }

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
      //const memberTag = await this.userTag(memberUid);
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

  async removeUser(userUid: string) {
    this.projectService.removeMember(this.projectBody, userUid);
    this.members = this.members.filter(value => value[1] !== userUid)

    if (this.members.length == 1) {
      this.projectService.openProject(this.projectBody.uid)
    }
    
  }

  async editTag(member: [string, string], tag: string){
    this.selectedUser = member
    this.selectedTag  = tag
    if (!this.selectedTag){
      this.selectedTag = ''
    }
    this.toggleModal()
  }

  async saveUserTag(){
    try {
      await this.projectService.editUserTag(this.projectBody, this.selectedUser[1], this.selectedTag);
      this.projectBody.tags[this.selectedUser[1]] = this.selectedTag;
    } catch (error) {
      
    }
  }
  
  toggleModal(){
    this.showTagModal = !this.showTagModal;
  }
}
