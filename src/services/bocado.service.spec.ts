import { TestBed } from '@angular/core/testing';

import { BocadoService } from './bocado.service';

describe('BocadoService', () => {
  let service: BocadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BocadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
