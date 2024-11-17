import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RealTodosService } from './real-todos.service';

describe('RealTodosService', () => {
  let service: RealTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(RealTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
