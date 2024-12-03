import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProjectService } from '../../data-access/project.service';
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
    projectServiceSpy.getProjects.and.returnValue(of());

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
