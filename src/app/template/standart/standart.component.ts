import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-standart',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './standart.component.html',
  styleUrl: './standart.component.css'
})
export class StandartComponent {

}
