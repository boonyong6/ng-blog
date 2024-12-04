import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { TestHelper } from '../../tests/test-helper';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getLatestPosts should make GET request to get latest posts endpoint', () => {
    firstValueFrom(service.getLatestPosts());

    const req = httpTesting.expectOne(`${env.apiBaseUrl}/posts/latest/`);
    expect(req.request.method).toBe('GET');
  });

  it('#getPosts should make GET request to get posts endpoint when `tagSlug` is not specified', () => {
    firstValueFrom(service.getPosts());

    const req = httpTesting.expectOne(`${env.apiBaseUrl}/posts/?page=1`);
    expect(req.request.method).toBe('GET');
  });

  it("#getPosts should make GET request to get tag's posts endpoint when `tagSlug` is specified", () => {
    const tagSlug = 'example';

    firstValueFrom(service.getPosts({ tagSlug }));

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/tags/${tagSlug}/posts/?page=1`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('#getPosts should make GET request to given url', () => {
    TestHelper.assertRequestWasMadeToGivenUrl(
      (url) => service.getPosts({ url }),
      httpTesting,
      'GET',
    );
  });

  it('#getPost should make GET request to get a post', () => {
    const [year, month, day, slug] = ['2024', '12', '3', 'example-post'];

    firstValueFrom(service.getPost({ year, month, day, slug }));

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/posts/${year}/${month}/${day}/${slug}/`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('#getPost should make GET request to given url', () => {
    TestHelper.assertRequestWasMadeToGivenUrl(
      (url) => service.getPost({ url }),
      httpTesting,
      'GET',
    );
  });

  it('#getSimilarPosts should make GET request to get similar posts', () => {
    const [year, month, day, slug] = ['2024', '12', '3', 'example-post'];

    firstValueFrom(service.getSimilarPosts({ year, month, day, slug }));

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/posts/${year}/${month}/${day}/${slug}/similar/`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('#getSimilarPosts should make GET request to given url', () => {
    TestHelper.assertRequestWasMadeToGivenUrl(
      (url) => service.getSimilarPosts({ url }),
      httpTesting,
      'GET',
    );
  });

  it('#getTags should make GET request to get tags', () => {
    firstValueFrom(service.getTags());

    const req = httpTesting.expectOne(`${env.apiBaseUrl}/tags/?page=1`);
    expect(req.request.method).toBe('GET');
  });

  it('#getTags should make GET request to given url', () => {
    TestHelper.assertRequestWasMadeToGivenUrl(
      (url) => service.getTags({ url }),
      httpTesting,
      'GET',
    );
  });

  it('#searchPosts should make GET request to get matched posts', () => {
    const query = 'example';

    firstValueFrom(service.searchPosts({ query }));

    const req = httpTesting.expectOne(
      `${env.apiBaseUrl}/posts/search/?page=1&query=${query}`,
    );
    expect(req.request.method).toBe('GET');
  });

  it('#searchPosts should make GET request to given url', () => {
    TestHelper.assertRequestWasMadeToGivenUrl(
      (url) => service.searchPosts({ url }),
      httpTesting,
      'GET',
    );
  });
});
