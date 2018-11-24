import { TestBed } from '@angular/core/testing';

import { OrderCreatorService } from './order-creator.service';

describe('OrderCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderCreatorService = TestBed.get(OrderCreatorService);
    expect(service).toBeTruthy();
  });
});
