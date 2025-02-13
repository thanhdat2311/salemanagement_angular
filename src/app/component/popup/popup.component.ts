import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  closePopup(): void {
    this.dialogRef.close();
  }
}
