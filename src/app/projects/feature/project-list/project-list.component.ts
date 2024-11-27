import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectListItemComponent } from '../../ui/project-list-item/project-list-item.component';
import { ProjectService } from '../../data-access/project.service';
import { Project } from '../../data-access/types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-list',
  imports: [MatButtonModule, MatIconModule, ProjectListItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  projectsNextUrl: string | null = null;

  constructor(
    private destroyRef: DestroyRef,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadMoreProjects() {
    if (this.projectsNextUrl == null) {
      return;
    }
    this.loadProjects(this.projectsNextUrl);
  }

  private loadProjects(url?: string): void {
    this.projectService
      .getProjects({ url })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((projectPage) => {
        this.projects.push(...projectPage.results);
        this.projectsNextUrl = projectPage.next;
      });
  }
}
