import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { assertRequestWasMadeToGivenUrl } from '../../tests/test-helper';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CommentService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getComments should make GET request with post_id query param', () => {
    const postId = 6;

    firstValueFrom(service.getComments({ postId }));

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/comments/?page=1&post_id=${postId}`,
      "Get post's comments",
    );
    expect(req.request.method).toBe('GET');
  });

  it('#getComments should accept no argument', () => {
    firstValueFrom(service.getComments());

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/comments/?page=1`,
      'Get comments.',
    );
    expect(req.request.method).toBe('GET');
  });

  it('#getComments should make GET request to given url', () => {
    assertRequestWasMadeToGivenUrl(
      (url) => service.getComments({ url }),
      httpTesting,
      'GET',
    );
  });

  it('#createComment should make POST request to create comment endpoint', () => {
    const body = '';
    const postId = 6;

    firstValueFrom(service.createComment({ body, postId }));

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/comments/`,
      'Create a comment on a post.',
    );
    expect(req.request.method).toBe('POST');
  });
});
