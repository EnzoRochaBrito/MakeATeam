import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'project-card',
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() title!: string;
  @Input() image!: string;
  @Input() description!: string;
  @Input() tags!: string[];
  @Input() members!: number;
  @Input() timeAgo!: Timestamp;
  @Input() id!: number;

}
