import { TestBed } from '@angular/core/testing';

import { SearchDialogService } from './search-dialog.service';

describe('SearchDialogService', () => {
  let service: SearchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
