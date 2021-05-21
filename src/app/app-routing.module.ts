import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module')
      .then(m => m.EmployeesModule)
  },

  
  { path: '', redirectTo: 'employee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
