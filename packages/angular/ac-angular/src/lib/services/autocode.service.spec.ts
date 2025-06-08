import { TestBed } from '@angular/core/testing';

import { AutocodeService } from './autocode.service';

describe('AutocodeService', () => {
  let service: AutocodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
