import { TestBed } from '@angular/core/testing';

import { InterfaceMessageService } from './interface-message.service';

describe('InterfaceMessageService', () => {
  let service: InterfaceMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
