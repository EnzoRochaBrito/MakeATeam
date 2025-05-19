import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'project-card',
  imports: [CommonModule, DatePipe],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() tags!: string[];
  @Input() vacancyAmount!: number;
  @Input() createdAt!: number;
  @Input() id!: number;
  @Input() creator!: string;
  @Input() peopleIn!: number;

}
