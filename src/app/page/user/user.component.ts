import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { IUserProfile, UserProfileDTO } from '../../utils/dto/user.dto';
import { StandartComponent } from '../../template/standart/standart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [StandartComponent, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
 
  uid!: string;
  userProfile!: IUserProfile
  constructor(readonly route: ActivatedRoute, readonly userService: UserServiceService){}

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    // this.userProfile = await this.userService.getUser(this.uid) as IUserProfile;
    // localStorage.setItem("profile", JSON.stringify(this.userProfile))
    this.userProfile = JSON.parse(localStorage.getItem("profile")!) as IUserProfile
    console.log(this.userProfile)
  }
}
