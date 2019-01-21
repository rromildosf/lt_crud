import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { MatModulesModule } from '../mat-modules/mat-modules.module';
import { NgxMaskModule } from 'ngx-mask';
import { ActivatedRoute } from '@angular/router';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    const fakeActivatedRoute = {
      snapshot: { data: {  } }
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      imports: [
        MatModulesModule,
        NgxMaskModule.forChild()
      ],
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
