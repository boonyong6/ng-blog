import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list-item',
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './project-list-item.component.html',
  styleUrl: './project-list-item.component.css',
})
export class ProjectListItemComponent {
  isInternalLink(link: string) {
    return false;
  }
}
