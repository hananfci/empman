import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';



const routes: Routes = [
 
  {
    path: '',
    component: EmployeeComponent, children:[
      {path:'', component : EmployeelistComponent},
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})



  export class EmployeeRoutingModule { }
  
 
  
