import { Component, Input } from '@angular/core';
import { Tag } from '../../data-access/types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TagLinkComponent } from '../../../tags/ui/tag-link/tag-link.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-sidenav',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TagLinkComponent,
  ],
  templateUrl: './tag-sidenav.component.html',
  styleUrl: './tag-sidenav.component.css',
})
export class TagSidenavComponent {
  @Input() tags!: Tag[];
  @Input() more: boolean = false;
  @Input() loadMore!: () => void;
  @Input() selectedTag = '';
}
