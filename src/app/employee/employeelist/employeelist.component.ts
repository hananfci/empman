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
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
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
  isChecked:boolean = false;
  checkedEmps:Array<number> = [];
  bsModalRef: BsModalRef;
  closeResult: string; 
  constructor(private ngbModal: NgbModal,private router:Router,private route:ActivatedRoute,private employeeService:EmployeeService,private modalService: BsModalService) { }

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
  open(content, empID,empNameDelete) {  
    this.DeletedName = empNameDelete;
    this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteHero(empID);  
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }  
  openDeleteGruop(content,empNameDelete) {  
    this.DeletedName = empNameDelete;
    this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.checkedEmps.map(item => {this.deleteHero(item)})
         
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });
  }
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  
  
  deleteHero(id) {  
    debugger
    this.employeeService.onDelete(id).subscribe(data=>{
      this.postdata = false; 
        this.employees=null;
        this.empList();
      },err=>{this.postdata = false;});  
  }
  
  checkValue(event:any, id:number)
  {
       if(event.target.checked == true){
            if(!this.checkedEmps.includes(id))
                {
                  this.checkedEmps.push(id);
                }
          }
         else
         {
            if(this.checkedEmps.includes(id))
              {
                this.checkedEmps = this.checkedEmps.filter(item => item !== id);
              } 
         } 
  }
  
 
  checkAllValue(event){
console.log(event)
this.checkedEmps = []
const cols = document.querySelectorAll('.form-check-input');

[].forEach.call(cols, (event)=>{

  this.isChecked = !this.isChecked;
 console.log(event.target.name);
});
  }
}
