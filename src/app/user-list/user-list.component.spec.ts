import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { MatModulesModule } from '../mat-modules/mat-modules.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
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
      declarations: [ UserListComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute } ,
        Router
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
