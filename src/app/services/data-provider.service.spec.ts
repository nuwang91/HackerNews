import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DataProviderService } from './data-provider.service';

describe('DataProviderService', () => {
  let service: DataProviderService;

  const mockHttpClient: Partial<HttpClient> = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });
    service = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
