import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WINDOW } from '../../../shared/utils/injection-tokens';
import { Project } from '../../data-access/types';
import { ProjectListItemComponent } from './project-list-item.component';

describe('ProjectListItemComponent', () => {
  let component: ProjectListItemComponent;
  let fixture: ComponentFixture<ProjectListItemComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let windowSpy: jasmine.SpyObj<Window & typeof globalThis>;

  beforeEach(async () => {
    const _routerSpy = jasmine.createSpyObj<Router>(['navigate']);
    const _windowSpy = jasmine.createSpyObj<Window>(['open']);
    _windowSpy.location = {
      host: 'localhost',
    } as Location;

    await TestBed.configureTestingModule({
      imports: [ProjectListItemComponent],
      providers: [
        { provide: Router, useValue: _routerSpy } as Provider,
        { provide: WINDOW, useValue: _windowSpy } as Provider,
      ],
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    windowSpy = TestBed.inject(WINDOW) as jasmine.SpyObj<
      Window & typeof globalThis
    >;

    fixture = TestBed.createComponent(ProjectListItemComponent);
    component = fixture.componentInstance;
    component.project = { thumbnail: 'static/logo.png' } as Project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#goToUrl should open external URL in new tab', () => {
    const url = 'https://example.com/';

    component.goToUrl(url);

    expect(windowSpy.open).toHaveBeenCalledWith(url);
  });

  it('#goToUrl should navigate to a route', () => {
    const urlString = 'http://localhost/tests/example/?page=1';

    component.goToUrl(urlString);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['example/'], {
      queryParams: { page: '1' },
    });
  });
});
