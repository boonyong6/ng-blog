import { HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom, Observable } from 'rxjs';

export class TestHelper {
  static assertRequestWasMadeToGivenUrl<T>(
    callback: (url: string) => Observable<T>,
    httpTesting: HttpTestingController,
    httpMethod: 'GET' | 'POST',
  ) {
    const url = 'https://example.com/';

    firstValueFrom(callback(url));

    const req = httpTesting.expectOne(url);
    expect(req.request.method).toBe(httpMethod);
  }
}
