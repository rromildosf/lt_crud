import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';

describe('UsersService', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  
  beforeEach(() => TestBed.configureTestingModule({
    providers:[
      { provide: ActivatedRoute, useValue: fakeActivatedRoute } 

    ]
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
