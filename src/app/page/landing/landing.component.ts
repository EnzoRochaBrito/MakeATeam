import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AltHeaderComponent } from '../../components/alt-header/alt-header.component';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, AltHeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
