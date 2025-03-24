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
import { Task } from '../models/task';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {

  // Child Components
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  // Page var
  totalPages: number = 0;
  pageSize: number = 5;
  pageNo: number = 0;
  sortBy: string = "id:asc";
  keyword: string = '';
  currentPage: number = 0;
  pages: number[] = [];
  listSize: { size: number }[] = [
    { size: 2 }, { size: 5 }, { size: 10 }, { size: 15 }, { size: 20 }
  ]
  visiblePages: number[] = [];

  // Tasks var
  taskId: number = 0;
  taskList: Task[] = [];

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

  constructor(
    private taskService: TaskService,
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
    this.getAllTask(this.pageNo, this.pageSize, this.sortBy);
    this.getAllCompany(this.pageNo, this.pageSize, this.sortBy);
    this.getAllStatus();
    this.getAllUser();
    this.getRoles();
    this.getUserDetails();
    this.loading = false

    this.barList = [
      { id: 1, name: "Customer" },
      { id: 2, name: "Status" },
      { id: 3, name: "User" },
      { id: 4, name: "Task" }
    ]
  }


  // Paging
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages-1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 0);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index)
  }
  onPageChange(page: number) {
    if (page < 0) {
      return;
    }
    if (page >= this.totalPages) {
      return;
    }
    debugger
    this.pageNo = page
    this.currentPage = page;
    switch (this.barSelected) {
      case 1:
        this.getAllCompany(this.pageNo, this.pageSize, this.sortBy);
        break;
      case 4:
        this.getAllTask(this.pageNo, this.pageSize, this.sortBy)
        break;  }
    }

  onChangeLimit(numberLimit: number) {
    this.currentPage = 0;
    this.pageNo = 0;
    this.pageSize = numberLimit;
    console.info(this.pageSize)
    switch (this.barSelected) {
      case 1:
        this.getAllCompany(this.pageNo, this.pageSize, this.sortBy);
        break;
      case 4:
        this.getAllTask(this.pageNo, this.pageSize, this.sortBy)
        break;


    }
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
            this.updateStatus(result.statusDTO, this.statusId);
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
  getAssignedEmails(users: AssignedPerson[] | undefined): string {
    return users?.map(user => user.email).join(', ') || 'No assigned users';
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
  onTaskSelected(taskId: number, formStatus: string) {
    this.taskId = taskId;
  }
  // Methods to call API
  getUserDetails() {
    debugger
    this.userService.getUserDetails().subscribe({

      next: (response: any) => {
        debugger
        this.userService.saveUserToLocalStorage(response)


      },
      complete: () => {

      },
      error: (error: any) => {
        debugger

      }
    })
  }

  getAllTask(pageNo: number, pageSize: number, sortBy: string) {
    this.taskService.getTaskByAdmin(pageNo, pageSize, sortBy).subscribe({
      next: (response: any) => {
        debugger
        this.taskList = response.items;
        this.pageSize = response.pageSize
        this.totalPages = response.totalPage;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)

        console.log(this.taskList)
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
  getAllCompany(pageNo: number, pageSize: number, sortBy: string) {
    this.companyService.getAllCompany(pageNo, pageSize, sortBy).subscribe({
      next: (response: any) => {
        debugger
        this.companyList = response.items;
        this.pageSize = response.pageSize
        this.totalPages = response.totalPage;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)
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
  getRoles() {
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
        this.getAllCompany(this.pageNo, this.pageSize, this.sortBy);
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
        this.getAllCompany(this.pageNo, this.pageSize, this.sortBy);
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
  updateStatus(statusDTO: any, statusId: number) {
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
  updateUser(userDTO: any, emailUser: string) {
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
