import { TestBed } from '@angular/core/testing';

import { RealTodosService } from './real-todos.service';

describe('RealTodosService', () => {
  let service: RealTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
