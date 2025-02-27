import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CompanyService } from 'src/app/services/company.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { StatusService } from 'src/app/services/status.service';

import { Company } from '../models/company';
import { Status } from '../models/status';
import { AssignedPerson } from '../models/user';
import { Role } from '../models/role';

import { PopupComponent } from '../popup/popup.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  // Child Components
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;

  // Loading variables
  loading = true;

  // Variables for save data
  companyList: Company[] = [];
  statusList: Status[] = [];
  userList: AssignedPerson[] = [];
  roles: Role[] = [];

  // Variables for visible bar
  barSelected: number = 1;
  
  // Variables for open popup
  companyId: number = 0;
  statusId: number = 0;
  emailUser: string = '';

  // Variables for open bar
  barList: { id: number; name: string }[] = [];

  constructor(private taskService: TaskService,
    private userService: UserService,
    private companyService: CompanyService,
    private statusService: StatusService,
    private roleService: RoleService,
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
    this.getRoles()
    this.loading = false

    this.barList = [
      { id: 1, name: "Customer" },
      { id: 2, name: "Status" },
      { id: 3, name: "User" }]
  }

  // Methods to open the dialog
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
        statusSelected = this.statusList.find(status => status.id == this.statusId)
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
          case 'editStatus':
            this.updateStatus(result.statusDTO,this.statusId);
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
    let userPopUp;
    let companySelect;
    switch (toDoConfig) {
      case 'addNewUser':
        userPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          roleList: this.roles
        }
        break;

      case 'editUser':
        const userSelected = this.userList.find(user => user.email == this.emailUser)
        userPopUp = {
          barId: this.barSelected,
          todo: toDoConfig,
          userSelected: userSelected,
          roleList: this.roles
        }
        break;

    }
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '500px',  // Chiều rộng popup
      disableClose: false,
      data: userPopUp
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.todo) {
          case 'addNewUser':
            this.createCompany(result.companyDTO);
            break;
          case 'editUser':
            
            this.updateUser(result.userDTO, this.emailUser);
            break;
        }
      }
    })
  };

  onBarSelected(barID: number) {
    this.barSelected = barID;
  }

  // Methods to open bar
  onCompanySelected(companyId: number, formName: string) {
    this.companyId = companyId;
  }
  onUserSelected(email: string, formUSer: string) {
    debugger
    this.emailUser = email;
  }
  onStatusSelected(statusId: number, formStatus: string) {
    this.statusId = statusId;
  }

  // Methods to call API
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
  getRoles(){
    this.roleService.getRoles().subscribe({
      next: (response: any) => {
        debugger
        this.roles = response;
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

  // Methods to create or update data
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
  updateUser(userDTO:any,emailUser:string){
    debugger
    this.userService.updateUser(userDTO, emailUser).subscribe({
      next: (response: any) => {
        debugger
        this.addNotification("Update successfully!", "info")
        this.getAllUser();
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

  // Methods to get notifications
  addNotification(content: string, type: 'info' | 'warning' | 'error' | 'success') {
    this.notificationComponent.addNotification(content, type);
  }
}
