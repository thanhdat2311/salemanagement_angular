import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(

    public dialog: MatDialog,

  ) {

  }
  statusText = '';
  reason = '';
  posts: { status: string; reason: string; createdAt: Date }[] = [];



  postStatus() {
    if (this.statusText.trim() && this.reason.trim()) {
      this.posts.unshift({
        status: this.statusText,
        reason: this.reason,
        createdAt: new Date(),
      });
      this.statusText = '';
      this.reason = '';
    }
  }
  // Open pop up

  openPopupDashBoard(toDoConfig: string): void {
    let postPopup;

    switch (toDoConfig) {
      case 'addNewPost':
        postPopup = {
          barId: 10,
          todo: toDoConfig
        }
        break;

      case 'editPost':


        break;

    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',  
      disableClose: false,
      data: postPopup
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.todo) {
          case 'addNewPost':
            break;
          case 'editPost':
            break;
        }
      }
    })
  };

}
