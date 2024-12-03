import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-link',
  imports: [RouterLink, UpperCasePipe, MatButtonModule],
  templateUrl: './tag-link.component.html',
  styleUrl: './tag-link.component.css',
})
export class TagLinkComponent implements OnInit {
  @Input() tagName!: string;
  @Input() tagCount?: number;

  tagSlug: string = '';

  ngOnInit(): void {
    this.tagSlug = this.tagName.replaceAll(' ', '-');
  }
}
