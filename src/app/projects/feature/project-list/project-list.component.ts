import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ProjectListItemComponent } from '../../ui/project-list-item/project-list-item.component';
import { ProjectService } from '../../data-access/project.service';
import { Project } from '../../data-access/types';
import { Paginator } from '../../../shared/utils/paginator';
import { Page } from '../../../shared/data-access/types';

@Component({
  selector: 'app-project-list',
  imports: [MatButtonModule, MatIconModule, ProjectListItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  paginator!: Paginator<Project>;

  constructor(
    private projectService: ProjectService,
    destroyRef: DestroyRef,
  ) {
    destroyRef.onDestroy(() => {
      this.paginator.destroy();
    });
  }

  get projects(): Project[] {
    return this.paginator.data;
  }

  ngOnInit(): void {
    this.paginator = new Paginator(this.getProjectPage$());
  }

  loadMoreProjects(): void {
    this.paginator.loadNext((nextUrl) => this.getProjectPage$(nextUrl ?? ''));
  }

  private getProjectPage$(url?: string): Observable<Page<Project>> {
    return this.projectService.getProjects({ url });
  }
}
