import { Component, EventEmitter, Output, Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { SearchDialogComponent } from './search-dialog.component';
import { SearchDialogService } from './search-dialog.service';

describe('SearchDialogService', () => {
  let service: SearchDialogService;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let mockSearchDialogComponent: MockSearchDialogComponent;
  let dialogClose: Subject<void>;
  let dialogRef: MatDialogRef<MockSearchDialogComponent, any>;

  beforeEach(() => {
    const _dialogServiceSpy = jasmine.createSpyObj<MatDialog>(['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: _dialogServiceSpy } as Provider,
      ],
    });
    service = TestBed.inject(SearchDialogService);

    // Set up `dialogServiceSpy`.
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    mockSearchDialogComponent = TestBed.createComponent(
      MockSearchDialogComponent,
    ).componentInstance;
    dialogClose = new Subject<void>();

    dialogRef = {
      componentInstance: mockSearchDialogComponent,
      beforeClosed: () => dialogClose.asObservable(),
    } as MatDialogRef<MockSearchDialogComponent, any>;

    dialogServiceSpy.open.and.returnValue(dialogRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#open should open search dialog component', () => {
    service.open(() => of());
    dialogRef.componentInstance.searchInputChanged.emit('query');
    dialogRef.componentInstance.nextPageTriggered.emit('https://next-url.com/');

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(SearchDialogComponent);
    expect(service.isOpened).toBe(true);
  });

  it('#open should set `isOpened` state to `false` when dialog closing', () => {
    service.open(() => of());
    dialogClose.next();

    expect(service.isOpened).toBe(false);
  });

  it('#open should return early when it is already opened', () => {
    service.open(() => of());
    service.open(() => of());

    expect(dialogServiceSpy.open).toHaveBeenCalledTimes(1);
  });
});

@Component({
  selector: 'app-search-dialog',
  template: '<p>Mock Search Dialog Component</p>',
})
class MockSearchDialogComponent {
  @Output() searchInputChanged = new EventEmitter<string>();
  @Output() nextPageTriggered = new EventEmitter<string>();

  appendSearchResult() {}
}
