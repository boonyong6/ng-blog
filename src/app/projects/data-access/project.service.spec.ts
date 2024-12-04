import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { TestHelper } from '../../tests/test-helper';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('#getProjects should make GET request to get projects', () => {
    firstValueFrom(service.getProjects());

    const req = httpTesting.expectOne(`${env.apiBaseUrl}/projects/?page=1`);
    expect(req.request.method).toBe('GET');
  });

  it('#getProjects should make GET request to given url', () => {
    TestHelper.assertRequestWasMadeToGivenUrl(
      (url) => service.getProjects({ url }),
      httpTesting,
      'GET',
    );
  });
});
