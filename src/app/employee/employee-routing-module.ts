import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditempoloyeeComponent } from './editempoloyee/editempoloyee.component';
import { EmployeeComponent } from './employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';



const routes: Routes = [
 
  {
    path: '',
    component: EmployeeComponent, children:[
      {path:'', component : EmployeelistComponent},
      {path:'new', component:AddemployeeComponent},
     {path:':id/update', component:EditempoloyeeComponent}
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



  export class EmployeeRoutingModule { }
  
 
  
