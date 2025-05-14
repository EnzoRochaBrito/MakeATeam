import { Component, Input } from '@angular/core';

@Component({
  selector: 'acess-button',
  imports: [],
  templateUrl: './acess-button.component.html',
  styleUrl: './acess-button.component.css'
})
export class AcessButtonComponent {
  @Input() logo!: string;
}
