import { Component } from '@angular/core';
import { AcessButtonComponent } from '../../widget/acess-button/acess-button.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [AcessButtonComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userUid!: string;

  constructor(){
    try {
      this.userUid = JSON.parse(sessionStorage.getItem('profile')!).uid as string;
    } catch (error) {
      console.log(error)
    }
  }
}
