import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddEmployee, IEmployee } from 'src/app/share/employee.model';

 import { BsModalRef } from 'ngx-bootstrap/modal'; 
import { EmployeeService } from 'src/app/share/employee.service';

@Component({
  selector: 'app-editempoloyee',
  templateUrl: './editempoloyee.component.html',
  styleUrls: ['./editempoloyee.component.css']
})
export class EditempoloyeeComponent implements OnInit {

  employeeEditform:FormGroup;
  postdata :boolean= false;
  employee:IEmployee;
  list: any[] = []
  public event: EventEmitter<any> = new EventEmitter();
  route: any;
  location: any;
  constructor(private employeeService:EmployeeService, public bsModalRef: BsModalRef)  { }


  ngOnInit(): void {
    console.log(this.list[0].value)

    this.employeeEditform=new FormGroup({
      empName : new FormControl(null,Validators.required),
      empAddress : new FormControl(null,Validators.required),
      empEmail : new FormControl(null,[Validators.required,Validators.email]),
      empPhone : new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+[1-9]*$/),Validators.minLength(11)]),
    }); 
    this.onGetEmployee(+(this.list[0].value))
  }
  onGetEmployee(id:number)
  {
    
    this.employeeService.onGetEmployee(id).subscribe((res) => {
      const jsonValue = JSON.stringify(res);
      const valueFromJson = JSON.parse(jsonValue);
      this.employee = ((valueFromJson || {}));
      this.employeeEditform.patchValue({
          empName:this.employee.empName,
          empEmail:this.employee.empEmail,
          empAddress:this.employee.empAddress,
          empPhone:this.employee.empPhone ,
      }); 
   
    });      
  } 
  onSubmit(){
    this.postdata = true;
    this.employee={
         empId:+(this.list[0].value),
         empName:this.employeeEditform.value.empName,
          empEmail:this.employeeEditform.value.empEmail,
          empAddress:this.employeeEditform.value.empAddress,
          empPhone:this.employeeEditform.value.empPhone,
    };
      this.employeeService.onPut(this.employee).subscribe( data => { 
        this.postdata = false;
        this.saveToList();
      } ,  (error) => 
      {  
        this.postdata = false;
      });
  }

  saveToList() {
    this.triggerEvent();
    this.bsModalRef.hide();
   }
 
   triggerEvent() {
     this.event.emit({ data: this.employee , res:200  });
   } 
}
