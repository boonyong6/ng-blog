import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Page } from '../../../shared/data-access/types';
import { ProjectService } from '../../data-access/project.service';
import { Project } from '../../data-access/types';
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const _projectServiceSpy = jasmine.createSpyObj<ProjectService>([
      'getProjects',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [{ provide: ProjectService, useValue: _projectServiceSpy }],
    }).compileComponents();

    projectServiceSpy = TestBed.inject(
      ProjectService,
    ) as jasmine.SpyObj<ProjectService>;
    projectServiceSpy.getProjects.and.returnValue(
      of({
        count: 1,
        pageSize: 10,
        previous: null,
        next: 'https://example.com/?page=2',
        results: [
          { id: 1, title: 'blog', thumbnail: 'static/logo.png' } as Project,
        ],
      } satisfies Page<Project>),
    );

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more projects on "More" button clicked', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const project = {
      id: 1,
      title: 'untitled',
      thumbnail: 'static/logo.png',
    } as Project;
    projectServiceSpy.getProjects.and.returnValue(
      of({
        count: 2,
        pageSize: 10,
        previous: null,
        next: null,
        results: [project],
      } satisfies Page<Project>),
    );

    elt.querySelector('button')?.click();

    expect(component.paginator.data.length).toBe(2);
  });
});
