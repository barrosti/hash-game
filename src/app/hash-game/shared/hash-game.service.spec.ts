import { TestBed } from '@angular/core/testing';

import { HashGameService } from './hash-game.service';

describe('HashGameService', () => {
  let service: HashGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
