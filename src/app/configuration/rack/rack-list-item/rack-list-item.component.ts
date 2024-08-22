import { Component, Input } from '@angular/core';
import { Rack } from '../../../interfaces/rack';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rack-list-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rack-list-item.component.html',
  styleUrl: './rack-list-item.component.css',
})
export class RackListItemComponent {
  @Input() rack!: Rack;
}
