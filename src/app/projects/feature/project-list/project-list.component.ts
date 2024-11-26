import { Component, OnInit } from '@angular/core';
import { ProjectListItemComponent } from '../../ui/project-list-item/project-list-item.component';
import { ProjectService } from '../../data-access/project.service';
import { Observable } from 'rxjs';
import { Page } from '../../../shared/data-access/types';
import { Project } from '../../data-access/types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [AsyncPipe, ProjectListItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projectPage$!: Observable<Page<Project>>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectPage$ = this.projectService.getProjects();
  }
}
