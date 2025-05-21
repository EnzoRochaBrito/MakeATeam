import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { IUserProfile, UserProfileDTO } from '../../utils/dto/user.dto';
import { StandartComponent } from '../../template/standart/standart.component';
import { CommonModule } from '@angular/common';
import { ProjectTypeUid } from '../../utils/type/project.type';
import { ProjectPreviewComponent } from '../../widget/project-preview/project-preview.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  imports: [StandartComponent, CommonModule, RouterLink, ProjectPreviewComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
 
  uid!: string;
  userProfile!: IUserProfile
  ownedProjects!: ProjectTypeUid[]
  savedProjects!: ProjectTypeUid[]
  memberOfProjects!: ProjectTypeUid[]
  itsCurrentUser!: boolean
  userStack: string = '';

  authService: AuthService = inject(AuthService)

  constructor(readonly route: ActivatedRoute, readonly userService: UserServiceService){}

  async ngOnInit(): Promise<void> {

    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.userProfile = await this.userService.getUser(this.uid) as IUserProfile;
    
    if (!this.userProfile.description){
      this.userProfile.description = ""
    }

    const currentUid: string = JSON.parse(sessionStorage.getItem("profile")!).uid as string;

    (currentUid === this.uid) ? this.itsCurrentUser = true : this.itsCurrentUser = false;

    console.log(currentUid)
  }

  removeStack(index: number){
    this.userProfile.stack?.splice(index, 1);
  }

  addStack(){
    if((!this.userProfile.stack)){
      this.userProfile.stack = []
    }
      if (this.userStack){
  
        this.userProfile.stack?.push(this.userStack.trim().toLowerCase())
        this.userStack = '';
      }

  }

  async saveUser(){
    await this.userService.updateUser(this.userProfile)
  }

  logout(){
    this.authService.logout()
  }

}
