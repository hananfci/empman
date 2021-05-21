import { NgModule } from '@angular/core';

import {ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing-module';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditempoloyeeComponent } from './editempoloyee/editempoloyee.component';
import { EmployeeComponent } from './employee.component';
import { CommonModule } from '@angular/common';

import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';  

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,    
    ReactiveFormsModule,
    
    ModalModule.forRoot(),
    
  ],
  declarations: [
    EmployeeComponent,
  EmployeelistComponent,    
  AddemployeeComponent,    
  EditempoloyeeComponent,
],
exports: [
 
],
entryComponents: [AddemployeeComponent],
providers: [],
 
})
export class EmployeesModule { }
