
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddEmployee, IEmployee } from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  patchValue(arg0: { empName: string; empEmail: string; empAddress: string; empPhone: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient) { }
  apiRoot : 'http://81.10.12.74:105/api/Employees';

  getEmpList():Observable<any>
  {
    return this.http.get('http://81.10.12.74:105/api/Employees/getAllEmployees');
  }
  onGetEmployee(id:number){
    debugger
    return this.http.get(`http://81.10.12.74:105/api/Employees/getEmpByID/${id}`);  
  } 
  onDelete(id: number){
   
    return this.http.get(`http://81.10.12.74:105/api/Employees/deleteEmpByID/${id}`);
  } 
  onPost(employee: object){

    return this.http.post<IEmployee>('http://81.10.12.74:105/api/Employees/addEmployee', employee);
  }
  
  onPut(employee: object){
    debugger
    const editEmployee = employee as IEmployee;
    console.log("editEmployee",editEmployee)
    return this.http.post('http://81.10.12.74:105/api/Employees/editEmployee', editEmployee);
  }
 
}
