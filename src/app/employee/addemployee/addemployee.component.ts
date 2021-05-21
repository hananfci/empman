import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'; 
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  employeeAddform:FormGroup;;
  numberOfItems = 0;
  list: any[] = [];
  /* , public bsModalRef: BsModalRef */
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef)  { }

  ngOnInit(): void {
    debugger;
    
     this.employeeAddform=new FormGroup({
      name : new FormControl(null,Validators.required),
      empName : new FormControl(null,Validators.required),
      empAddess : new FormControl(null,Validators.required),
      empEmail : new FormControl(null,[Validators.required,Validators.email]),
      empPhone : new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+[1-9]*$/),Validators.minLength(11)]),
    }); 
    console.log(this.list)
  }
  onPost(){
  /*   this.postdata = true;
    this.center={ nameAr: this.centerForm.value.centerName , nameEn: '', code: '', mobileCode: '',
     governorateId: this.centerForm.value.govName};
    this.apiService.onPost( this.center).subscribe( data => { 
      this.postdata = false;
      this.confirmationDialogService.showToast('success', 'تمت الاضافة بنجاح', '  ');
      this.centerForm.reset();
    } ); */   
    
  }

  
  saveToList() {
  /*   this.onPost();
    if(form.value){
      this.triggerEvent(form.value.name);
      this.bsModalRef.hide();
    } */
    console.log("yes")
  }

  triggerEvent(item: string) {
    this.event.emit({ data: item , res:200  });
  }
}
