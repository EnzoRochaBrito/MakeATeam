import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { UserProfileDTO } from '../../utils/dto/user.dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'user-request',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.css'
})
export class UserRequestComponent implements OnInit {
  @Input() uid!: string;
  user!: UserProfileDTO;

  constructor(readonly userService: UserServiceService, readonly projectService: ProjectService){ }

  async ngOnInit() {
    this.user = await this.userService.getUser(this.uid) as UserProfileDTO
  } 

  async addMember(userUid: string){
    await this.projectService.addMember(this.uid, userUid);
  }

  async deleteRequest(userUid: string){
    await this.projectService.deleteRequest(this.uid, userUid);
  }
}
