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
  p: number = 1; 
  total:number;
  constructor(private ref: ChangeDetectorRef,private ngbModal: NgbModal,private router:Router,private route:ActivatedRoute,private employeeService:EmployeeService,private modalService: BsModalService) { }

  ngOnInit() {
    this.empList()
  }
  empList() {
    
    this.employeeService.getEmpList()
      .subscribe(
        response => {
         this.loadingdata= true;
         
          const jsonValue = JSON.stringify(response);
          const valueFromJson = JSON.parse(jsonValue);
          this.employees = ((valueFromJson || {}));
          this.total = ((valueFromJson || {})).records;
          this.ref.detectChanges();
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
      this.empList();
      this.ref.detectChanges();
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
      this.empList();
      this.ref.detectChanges();
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
    debugger;
    this.DeletedName = empNameDelete;
    if(this.checkedEmps.length <= 0  ){
      alert("please select Employee to delete it")
    }
    else{
      this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
        this.closeResult = `Closed with: ${result}`;  
        if (result === 'yes') {  
            this.checkedEmps.map(item => {this.deleteHero(item)})
            this.checkedEmps = [];
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });
    }
   
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
        this.empList();
      },err=>{});  
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
     this.isChecked = true
      this.checkedEmps = []
      const cols = document.querySelectorAll('.form-check-input');

      cols.forEach((event)=>{

      console.log(event.id);
      this.checkedEmps.push(+(event.id));
      });
  }
}
