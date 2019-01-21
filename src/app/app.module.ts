import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// the second parameter 'pt' is optional
registerLocaleData(localePt, 'pt');

import { NgxMaskModule } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { MatModulesModule } from './mat-modules/mat-modules.module';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { MessageComponent } from './commom/message/message.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'MM',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    AddressFormComponent,
    UserDetailsComponent,
    UserListComponent,
    UserRegisterComponent,
    MessageComponent,
    PersonalInfoFormComponent,
    VehicleFormComponent,
  ],
  entryComponents: [
    MessageComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatModulesModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
