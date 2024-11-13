import { Component, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

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
      url: '/posts',
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

  @ViewChild('drawer') drawer!: MatDrawer;
  private routerSub!: Subscription;

  constructor(mediaMatcher: MediaMatcher, private router: Router) {
    this.isDarkMode = mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer.close();
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
