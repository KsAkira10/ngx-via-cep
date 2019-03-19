import { TestBed } from '@angular/core/testing';

import { NgxViaCepService } from './ngx-via-cep.service';

describe('NgxViaCepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxViaCepService = TestBed.get(NgxViaCepService);
    expect(service).toBeTruthy();
  });
});
