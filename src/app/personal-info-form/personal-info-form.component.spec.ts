import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoFormComponent } from './personal-info-form.component';
import { MatModulesModule } from '../mat-modules/mat-modules.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

describe('PersonalInfoFormComponent', () => {
  let component: PersonalInfoFormComponent;
  let fixture: ComponentFixture<PersonalInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatModulesModule,
        NgxMaskModule.forChild()
      ],
      declarations: [ PersonalInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
