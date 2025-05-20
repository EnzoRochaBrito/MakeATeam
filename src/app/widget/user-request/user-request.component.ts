import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { UserProfileDTO } from '../../utils/dto/user.dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProjectTypeUid } from '../../utils/type/project.type';

@Component({
  selector: 'user-request',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.css'
})
export class UserRequestComponent implements OnInit {
  @Input() uid!: string;
  @Input() projectObj!: ProjectTypeUid;
  @Input() arrIndex!: number;
  @Output() activated = new EventEmitter<number>();
  user!: UserProfileDTO;

  constructor(readonly userService: UserServiceService, readonly projectService: ProjectService){ }

  async ngOnInit() {
    this.user = await this.userService.getUser(this.uid) as UserProfileDTO
  } 

  async addMember(userUid: string){
    await this.projectService.addMember(this.projectObj, userUid);
    this.activated.emit(this.arrIndex)
  }
  
  async deleteRequest(userUid: string){
    await this.projectService.deleteRequest(this.projectObj, userUid);
    this.activated.emit(this.arrIndex)
  }
}
