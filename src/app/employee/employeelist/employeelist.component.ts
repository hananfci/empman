import {Component, OnInit,ChangeDetectionStrategy, } from '@angular/core';
import { EmployeeService } from '../../share/employee.service';
import {IEmployee} from '../../share/employee.model'
import { BsModalRef, BsModalService, ModalOptions } from  'ngx-bootstrap/modal/';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { ChangeDetectorRef } from '@angular/core';
import { EditempoloyeeComponent } from '../editempoloyee/editempoloyee.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
 editMode:boolean = false;
   employees :  Array<IEmployee[]> ; 
  DeletedName : string;
  loadingdata :boolean= false;
  postdata :boolean= false;
  empid:number;
  isChecked:boolean = false;
  checkedEmps:Array<number> = [];
  bsModalRef: BsModalRef;
  closeResult: string; 
 
  page =1;//current Page
  count :number; //total pages
  pageSize = 10; // number of items in each page
  mod:number=0;
  constructor(private ref: ChangeDetectorRef,private ngbModal: NgbModal,private employeeService:EmployeeService,private modalService: BsModalService) { }

  ngOnInit() {
    this.empList()
  }
  empList() {
    
    this.employeeService.getEmpList()
      .subscribe(
        response => {
          debugger
         this.loadingdata= true;
          const jsonValue = JSON.stringify(response);
          const valueFromJson = JSON.parse(jsonValue);
          this.employees = ((valueFromJson || {}));
          this.count = this.employees.length;
          if(this.editMode){
            this.editMode=false;
            }
          else{
            if((this.count % this.pageSize)>0)
            {
               this.mod=1;
            }
          else
            {
              this.mod=0;
            }
            const countPage = ~~(((this.count)/this.pageSize)) + this.mod;
            this.page=countPage;
          }
          this.ref.detectChanges();
        },
        error => {
          
        });
  }
  handlePageChange(event) { // event is number of the new page
    this.page = event;
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
     
   });
  }
  openEditModalWithComponent(id:number) {
   this.editMode = true;
    const initialState = {
      list: [
        {"tag":'Count',"value":id}
      ]
    };
    this.bsModalRef = this.modalService.show(EditempoloyeeComponent, {initialState, backdrop: 'static',  keyboard: false,    animated: true,
    ignoreBackdropClick: true,});
    this.bsModalRef.content.closeBtnName = 'Close';  
    this.bsModalRef.content.event.subscribe(res => {
      this.empList();
      
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
     this.isChecked = !this.isChecked;
      this.checkedEmps = []
      const cols = document.querySelectorAll('.form-check-input');

      cols.forEach((event)=>{
      this.checkedEmps.push(+(event.id));
      });
  }
}
