import {Component, OnInit,ChangeDetectionStrategy, } from '@angular/core';
/* import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service'; */

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../share/employee.service';
import {IEmployee} from '../../share/employee.model'
import { BsModalRef, BsModalService } from  'ngx-bootstrap/modal/';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
/* import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

 */
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
   /* employees: Observable<IEmployee[]> */ 
   employees :  Array<IEmployee[]> ; 
  DeletedName : string;
  loadingdata :boolean= false;
  currentCenter = null;
  mod:number=0;
  postdata :boolean= false;
  empid:number;
  myList: Array<string> = ['.net', 'C#', 'web services'];
  itemList = ["Book","Pen"];
  bsModalRef: BsModalRef;
  constructor(private router:Router,private route:ActivatedRoute,private employeeService:EmployeeService,private modalService: BsModalService) { }

  ngOnInit() {
    this.empList()
  }
  empList() {
    
    this.employeeService.getEmpList()
      .subscribe(
        response => {
          debugger;
          this.loadingdata= true;
          const jsonValue = JSON.stringify(response);
          const valueFromJson = JSON.parse(jsonValue);
          this.employees = ((valueFromJson || {}));
         console.log(" this.employees",this.employees, "gggg",this.employees[0])
        },
        error => {
          
        });
  }

  openModalWithComponent() {
    const initialState = {
      list: [
        {"tag":'Count',"value":this.itemList.length}
      ]
    };
    this.bsModalRef = this.modalService.show(AddemployeeComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';  
    this.bsModalRef.content.event.subscribe(res => {
      this.itemList.push(res.data);
   });
  }

}
