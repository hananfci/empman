import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddEmployee } from 'src/app/share/employee.model';
import { EmployeeService } from 'src/app/share/employee.service';
 import { BsModalRef } from 'ngx-bootstrap/modal';  
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  employeeAddform:FormGroup;
  postdata :boolean= false;
  employee:IAddEmployee;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(private employeeService:EmployeeService, public bsModalRef: BsModalRef)  { }
 
  ngOnInit(): void {
     this.employeeAddform=new FormGroup({
      empName : new FormControl(null,Validators.required),
      empAddess : new FormControl(null,Validators.required),
      empEmail : new FormControl(null,[Validators.required,Validators.email]),
      empPhone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2]\d{1,8}$/),Validators.minLength(11)]),
    }); 
    
  }
  
  onPost(){
    this.postdata = true;
    this.employee={
       empName: this.employeeAddform.value.empName ,
        empEmail: this.employeeAddform.value.empEmail,
       empAddress: this.employeeAddform.value.empAddess,
        empPhone:this.employeeAddform.value.empPhone
      };
    this.employeeService.onPost( this.employee).subscribe( data => { 
      this.postdata = false;
      this.saveToList();
      this.employeeAddform.reset();
    } );    
    
  }

  
  saveToList() {
   this.triggerEvent();
   this.bsModalRef.hide();
  }

  triggerEvent() {
    this.event.emit({ data: this.employee , res:200  });
  } 
}
