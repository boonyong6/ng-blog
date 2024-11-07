import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-blog';
  isDarkMode;
  socialLinks = [
    {
      url: 'https://github.com/boonyong6',
      logoUrl: 'icons/github.svg',
      description: 'GitHub link',
    },
    {
      url: 'https://www.linkedin.com/in/boonyongkang/',
      logoUrl: 'icons/linkedin.svg',
      description: 'LinkedIn link',
    },
  ];
  menuItems = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Blog',
      url: '/blog',
    },
    {
      name: 'Tags',
      url: '/tags',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];

  constructor(mediaMatcher: MediaMatcher) {
    this.isDarkMode = mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  }
}
