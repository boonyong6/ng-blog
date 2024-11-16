import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../../../shared/data-access/types';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tag-link',
  standalone: true,
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
