import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Project } from '../../data-access/types';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-project-list-item',
  imports: [NgOptimizedImage, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './project-list-item.component.html',
  styleUrl: './project-list-item.component.css',
})
export class ProjectListItemComponent {
  @Input() project!: Project;

  constructor(private router: Router) {}

  goToUrl(urlString: string) {
    const url = new URL(urlString);

    // Navigate to a route (internal URL).
    if (url.host === window.location.host) {
      const searchParams = new URLSearchParams(url.search);
      // `substring(1)` removes the leading `/`.
      const path = url.pathname.replace(env.subdirectoryPath, '').substring(1);

      this.router.navigate([path], {
        queryParams: searchParams,
      });

      return;
    }

    // Open external URL in a new tab.
    window.open(url.href);
  }
}
