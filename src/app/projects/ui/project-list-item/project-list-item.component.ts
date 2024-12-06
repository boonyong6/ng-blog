import { NgOptimizedImage } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { WINDOW } from '../../../shared/utils/injection-tokens';
import { Project } from '../../data-access/types';

@Component({
  selector: 'app-project-list-item',
  imports: [NgOptimizedImage, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './project-list-item.component.html',
  styleUrl: './project-list-item.component.css',
})
export class ProjectListItemComponent {
  @Input() project!: Project;

  constructor(
    private router: Router,
    @Inject(WINDOW) private window: Window,
  ) {}

  goToUrl(urlString: string) {
    const url = new URL(urlString);

    // Open external URL in a new tab.
    if (url.host !== this.window.location.host) {
      this.window.open(url.href);
      return;
    }

    // Navigate to a route (internal URL).
    //   `substring(1)` removes the leading `/`.
    const path = url.pathname.replace(env.subdirectoryPath, '').substring(1);
    const searchParams = new URLSearchParams(url.search);

    const queryParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    this.router.navigate([path], { queryParams });
  }
}
