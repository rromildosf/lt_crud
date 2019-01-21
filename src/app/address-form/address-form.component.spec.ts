import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModulesModule } from '../mat-modules/mat-modules.module';
import { NgxMaskModule } from 'ngx-mask';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatModulesModule,
        NgxMaskModule.forChild()
      ],
      declarations: [ AddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
