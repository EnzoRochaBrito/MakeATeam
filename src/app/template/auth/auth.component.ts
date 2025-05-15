import { Component, Input } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { AltHeaderComponent } from '../../components/alt-header/alt-header.component';

@Component({
  selector: 'app-auth',
  imports: [FooterComponent, AltHeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthTemplateComponent {
 @Input() title!: string;
}
