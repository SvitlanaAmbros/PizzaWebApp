import { TestBed } from '@angular/core/testing';

import { PizzasInfoService } from './pizzas-info.service';

describe('PizzasInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PizzasInfoService = TestBed.get(PizzasInfoService);
    expect(service).toBeTruthy();
  });
});
