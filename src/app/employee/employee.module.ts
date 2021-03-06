import { NgModule } from '@angular/core';

import {ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing-module';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditempoloyeeComponent } from './editempoloyee/editempoloyee.component';
import { EmployeeComponent } from './employee.component';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';  

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,    
    ReactiveFormsModule,
    NgxPaginationModule,    
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

providers: [],
 
})
export class EmployeesModule { }
