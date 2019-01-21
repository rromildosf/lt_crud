import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { MatModulesModule } from 'src/app/mat-modules/mat-modules.module';
import { MatDialogRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    const mockDialogRef = {
      close: jasmine.createSpy('close')
    };
    TestBed.configureTestingModule({
      imports: [
        MatModulesModule
      ],
      declarations: [ MessageComponent ],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MessageComponent]
      }
    })
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
