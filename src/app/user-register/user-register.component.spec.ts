import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterComponent } from './user-register.component';
import { MatModulesModule } from '../mat-modules/mat-modules.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddressFormComponent } from '../address-form/address-form.component';
import { PersonalInfoFormComponent } from '../personal-info-form/personal-info-form.component';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatModulesModule,
        NgxMaskModule.forChild()
      ],
      declarations: [ 
        UserRegisterComponent,
        AddressFormComponent,
        PersonalInfoFormComponent,
        VehicleFormComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute } ,
        Router
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
