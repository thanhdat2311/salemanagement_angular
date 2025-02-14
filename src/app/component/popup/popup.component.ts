import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit{
  visibleFormId: number = 0;
  numberTest: number= 0;
  dataTest :{ id: number; name: string; }[] = [];
  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  )
  { }
  ngOnInit(): void {
  this.setVisibleForm(this.data.barId);
  this.dataTest = [
    {id:1, name: "Customer"},
    {id:2, name: "Status"},
    {id:3, name: "User"}];
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
