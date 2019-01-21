import { TestBed, getTestBed } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VehicleService', () => {
  let injector: TestBed;
  let service: VehicleService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientTestingModule
      ],
      providers: [
        VehicleService
      ]
    });
    injector = getTestBed();
    service = injector.get(VehicleService);
    httpMock = injector.get(HttpTestingController);
  });


  it('should be created', () => {
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
  });
});
