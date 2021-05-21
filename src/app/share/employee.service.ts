
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http:HttpClient) { }
  apiRoot : 'http://81.10.12.74:105/api';

  getEmpList():Observable<any>
  {
    return this.http.get('http://81.10.12.74:105/api/Employees/getAllEmployees');
  }
  onGetEmployee(id:number){
    return this.http.get(`${this.apiRoot}/getEmpByID/${id}`);  
  } 
  onDelete(id: number){
    return this.http.delete(`${this.apiRoot}/deleteEmpByID/${id}`);
  } 
  onPost(employee: object){

    return this.http.post<IEmployee>(`${this.apiRoot}/addEmployee`, employee);
  }
  
  onPut(id:number ,employee: object){
    const editEmployee = employee as IEmployee;
    return this.http.put(`${this.apiRoot}/editEmployee${id}`, editEmployee);
  }
 
}
