import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormComponent } from './vehicle-form.component';
import { MatModulesModule } from '../mat-modules/mat-modules.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let injector: TestBed;
  let service: VehicleService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatModulesModule
      ],
      declarations: [ VehicleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
