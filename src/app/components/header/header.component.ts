import { Component } from '@angular/core';
import { AcessButtonComponent } from '../../widget/acess-button/acess-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [AcessButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userUid!: string;

  constructor(){
    this.userUid = JSON.parse(sessionStorage.getItem('profile')!).uid as string;
  }
}
