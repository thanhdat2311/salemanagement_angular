import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { Company } from '../models/company';
import { Status } from '../models/status';
import { AssignedPerson } from '../models/user';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../notification/notification.component';
import { delay } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  loading = true;
  companyList: Company[] = [];
  statusList: Status[] = [];
  userList: AssignedPerson[] = [];
  companyId: number = 0;
  form: string = "";
  barSelected: number = 1;
  statusIdSelected: number = 0;
  emailUser: string = '';
  barList: { id: number; name: string }[] = [];
  constructor(private taskService: TaskService,
    private userService: UserService,
    private companyService: CompanyService,
    private statusService: StatusService,
    private fb: FormBuilder,
    public dialog: MatDialog,

  ) {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
  }

  ngOnInit() {
    this.loading = true
    this.getAllCompany();
    this.getAllStatus();
    this.getAllUser();

    this.loading = false

    this.barList = [
      { id: 1, name: "Customer" },
      { id: 2, name: "Status" },
      { id: 3, name: "User" }]
  }

  openPopupStatus(toDoConfig: string): void {
    let statusPopUp;
    let companySelect;
    let statusSelected;
    switch (toDoConfig) {
      case 'addNewStatus':
        statusPopUp = {
          barId: this.barSelected,
          todo: toDoConfig
        }
        break;

      case 'editStatus':
        statusSelected = this.statusList.find(status => status.id == this.statusIdSelected)
        statusPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          userList: this.userList,
          statusSelected: statusSelected
        }
        break;

    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',  // Chiều rộng popup
      disableClose: false,
      data: statusPopUp
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.todo) {
          case 'addNewStatus':
            this.createStatus(result.statusDTO);
            break;
          case 'editCustomer':
            this.updateCompany(result.companyDTO, this.companyId);
            break;
          case 'addNewStatus':
            this.createStatus(result.statusDTO);
            break;
          case 'editStatus':
            this.updateStatus(result.statusDTO,this.statusIdSelected);
            break;
        }
      }
    })
  };
  openPopupCustomer(toDoConfig: string): void {
    let userListPopUp;
    let companySelect;
    switch (toDoConfig) {
      case 'addNewCustomer':
        userListPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          userList: this.userList
        }
        break;

      case 'editCustomer':
        companySelect = this.companyList.find(company => company.id == this.companyId)
        userListPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          userList: this.userList,
          companySelect: companySelect
        }
        break;

    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',  // Chiều rộng popup
      disableClose: false,
      data: userListPopUp
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.todo) {
          case 'addNewCustomer':
            this.createCompany(result.companyDTO);
            break;
          case 'editCustomer':
            this.updateCompany(result.companyDTO, this.companyId);
            break;
        }
      }
    })
  };

  openPopupUser(toDoConfig: string): void {
    let userListPopUp;
    let companySelect;
    switch (toDoConfig) {
      case 'addNewUser':
        userListPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          userList: this.userList
        }
        break;

      case 'editUser':
        companySelect = this.companyList.find(company => company.id == this.companyId)
        userListPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          userList: this.userList,
          companySelect: companySelect
        }
        break;

    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',  // Chiều rộng popup
      disableClose: false,
      data: userListPopUp
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.todo) {
          case 'addNewCustomer':
            this.createCompany(result.companyDTO);
            break;
          case 'editCustomer':
            this.updateCompany(result.companyDTO, this.companyId);
            break;
        }
      }
    })
  };

  onCanceled() {
    this.form = ""
  }
  onBarSelected(barID: number) {
    this.barSelected = barID;
    this.form = ""
  }
  onCompanySelected(companyId: number, formName: string) {
    this.companyId = companyId;
    this.form = formName;
  }
  onUserSelected(email: string, formUSer: string) {
    debugger
    this.emailUser = email;
    this.form = formUSer;
  }
  onStatusSelected(statusId: number, formStatus: string) {
    this.statusIdSelected = statusId;
    this.form = formStatus;
  }

  getAllUser() {
    this.userService.getAllUser().subscribe({
      next: (response: any) => {
        debugger
        this.userList = response;
      }
      ,
      complete: () => {
        debugger;
      }
      ,
      error: (error: any) => {
        debugger
      }
    }
    )
  }
  getAllStatus() {
    this.taskService.getStatus().subscribe({
      next: (response: any) => {
        debugger
        this.statusList = response;
      }
      ,
      complete: () => {
        debugger;
      }
      ,
      error: (error: any) => {
        debugger
      }
    }
    )
  }
  getAllCompany() {
    this.companyService.getAllCompany().subscribe({
      next: (response: any) => {
        debugger
        this.companyList = response;
      }
      ,
      complete: () => {
        debugger;
      }
      ,
      error: (error: any) => {
        debugger
      }
    }
    )

  }

  openTab(tabName: string, event: Event) {
    // Xóa class active khỏi tất cả tab
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    // Hiển thị tab được chọn
    document.getElementById(tabName)?.classList.add('active');
    (event.target as HTMLElement).classList.add('active');
  }

  createCompany(companyDTO: any) {
    this.companyService.createCompany(companyDTO).subscribe({
      next: (response: any) => {
        debugger
        this.addNotification("add new successfully!", "info")
        this.getAllCompany();
      }
      ,
      complete: () => {
        debugger;

      }
      ,
      error: (error: any) => {
        debugger
        this.addNotification(error.error, "error")

      }
    }
    )
  }

  createStatus(statusDTO: any) {
    this.statusService.createStatus(statusDTO).subscribe({
      next: (response: any) => {
        debugger
        this.addNotification("add new successfully!", "info")
        this.getAllStatus();
      }
      ,
      complete: () => {
        debugger;

      }
      ,
      error: (error: any) => {
        debugger
        this.addNotification(error.error, "error")

      }
    }
    )
  }

  updateCompany(companyDTO: any, companySelected: number) {
    this.companyService.updateCompany(companyDTO, companySelected).subscribe({
      next: (response: any) => {
        debugger
        this.addNotification("Update successfully!", "info")
        this.getAllCompany();
      }
      ,
      complete: () => {
        debugger;

      }
      ,
      error: (error: any) => {
        debugger
        this.addNotification(error.error, "error")
      }
    }
    )
  }
  updateStatus(statusDTO: any, statusId:number){
    debugger
    this.statusService.updateStatus(statusDTO, statusId).subscribe({
      next: (response: any) => {
        debugger
        this.addNotification("Update successfully!", "info")
        this.getAllStatus();
      }
      ,
      complete: () => {
        debugger;

      }
      ,
      error: (error: any) => {
        debugger
        this.addNotification(error.error, "error")
      }
    }
    )
  }
  addNotification(content: string, type: 'info' | 'warning' | 'error' | 'success') {
    this.notificationComponent.addNotification(content, type);
  }
}
