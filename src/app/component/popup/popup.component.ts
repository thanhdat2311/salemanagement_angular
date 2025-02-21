import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedPerson } from '../models/user';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit{
  visibleFormId: number = 0;
  selectedUserEmails: string[] = [];
  numberTest: number= 2;
  dataTest : AssignedPerson[] = [];
  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  )
  { }
  ngOnInit(): void {
  this.setVisibleForm(this.data.barId);
  this.dataTest = this.data.userList || [];
  console.log("Danh sách user:", JSON.stringify(this.dataTest, null, 2))  
    console.log("Danh sách user:",this.visibleFormId)
}
  onClose(): void {
    this.dialogRef.close();
  }
  setVisibleForm(visibleFormId: number) {
    this.visibleFormId = visibleFormId
  }

  onSubmit(): void {
    
  }
}
