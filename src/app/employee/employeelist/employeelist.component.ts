import {Component, OnInit,ChangeDetectionStrategy, } from '@angular/core';
/* import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service'; */

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../share/employee.service';
import {IEmployee} from '../../share/employee.model'
import { BsModalRef, BsModalService, ModalOptions } from  'ngx-bootstrap/modal/';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { ChangeDetectorRef } from '@angular/core';
import { throwError } from 'rxjs';
import { EditempoloyeeComponent } from '../editempoloyee/editempoloyee.component';
/* import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

 */
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  

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
  constructor(private ref: ChangeDetectorRef,private router:Router,private route:ActivatedRoute,private employeeService:EmployeeService,private modalService: BsModalService) { }

  ngOnInit() {
    this.empList()
  }
  empList() {
    
    debugger
    this.employeeService.getEmpList()
      .subscribe(
        response => {
         this.loadingdata= true;
          const jsonValue = JSON.stringify(response);
          const valueFromJson = JSON.parse(jsonValue);
          this.employees = ((valueFromJson || {}));
        },
        error => {
          
        });
  }

  openModalWithComponent() {
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(AddemployeeComponent,config);
    this.bsModalRef.content.closeBtnName = 'Close';  
    this.bsModalRef.content.event.subscribe(res => {
      this.router.navigate(['./employee/addemployee'] )
   });
  }
  openEditModalWithComponent(id:number) {
 
    const initialState = {
      list: [
        {"tag":'Count',"value":id}
      ]
    };
    this.bsModalRef = this.modalService.show(EditempoloyeeComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';  
    this.bsModalRef.content.event.subscribe(res => {
      debugger
     
      
      this.router.navigate(['./employee/addemployee'] )
   });
  }
  onEdtiClick(id:number){
    
    this.router.navigate([`${id}/edit`],{relativeTo: this.route} );
    
  }
}
