import { TestBed } from '@angular/core/testing';

import { RestorauntResolverService } from './restoraunt-resolver.service';

describe('RestorauntResolverService', () => {
  let service: RestorauntResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestorauntResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
