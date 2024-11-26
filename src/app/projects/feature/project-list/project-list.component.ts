import { Component } from '@angular/core';
import { ProjectListItemComponent } from '../../ui/project-list-item/project-list-item.component';

@Component({
  selector: 'app-project-list',
  imports: [ProjectListItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {}
