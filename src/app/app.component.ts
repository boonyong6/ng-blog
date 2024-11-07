import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgOptimizedImage,
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

  constructor(mediaMatcher: MediaMatcher) {
    this.isDarkMode = mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  }
}
