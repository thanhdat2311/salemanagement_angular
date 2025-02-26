import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedPerson } from '../models/user';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../models/company';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  visibleFormId: number = 0;
  selectedUserEmails: string[] = [];
  numberTest: number = 2;
  userList: AssignedPerson[] = [];
  companyName: string  = '';
  email: string = '';
  phone: string = '';
  assigned_person: string[] = []
  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.setVisibleForm(this.data.barId);
    this.userList = this.data.userList || [];
    switch(this.data.todo){
    case 'editCustomer':
    this.companyName = this.data.companySelect.companyName;
    this.email = this.data.companySelect.email;
    this.phone = this.data.companySelect.phone;
    this.selectedUserEmails = this.data.companySelect.assignedPerson.email;
    break;
    }
  }
  onClose(): void {
   
    this.dialogRef.close();  }
  setVisibleForm(visibleFormId: number) {
    this.visibleFormId = visibleFormId
  }


  onSubmit(toDo: String): void {
    switch (toDo) {
      case 'addNewCustomer':
        {
        debugger
        const companyDTO = {
          companyName: this.companyName,
          email: this.email,
          phone: this.phone,
          assigned_person: this.selectedUserEmails
        };
       const dataBackConfig ={todo:"addNewCustomer",companyDTO};
       this.dialogRef.close(dataBackConfig);
       break;
      }
      case 'editCustomer':
        debugger
        const companyDTO = {
          companyName: this.companyName,
          email: this.email,
          phone: this.phone,
          assigned_person: this.selectedUserEmails
        };
       const dataBackConfig ={todo:"editCustomer",companyDTO};
       this.dialogRef.close(dataBackConfig);
       break;
    }  
  }
}
 