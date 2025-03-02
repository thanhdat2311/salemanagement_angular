import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedPerson } from '../models/user';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../models/company';
import { NotificationComponent } from '../notification/notification.component';
import { Role } from '../models/role';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  visibleFormId: number = 0;
  numberTest: number = 2;
  // for Role
  roleSelected?: Role;
  roleList: Role[] = []
  // For Customer
  companyName: string = '';
  customerEmail: string = '';
  userList: AssignedPerson[] = [];
  selectedUserEmails: string[] = [];
  customerPhone: string = '';

  // For Status
  statusName: string = '';

  // For User
  userFullName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userAddress: string = '';
  userRole: number = 0;
  isActive: boolean = true;

  assigned_person: string[] = [];
  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    debugger
    this.setVisibleForm(this.data.barId);
    this.userList = this.data.userList || [];
    switch (this.data.todo) {
      case 'editCustomer':
        this.companyName = this.data.companySelect.companyName;
        this.customerEmail = this.data.companySelect.email;
        this.customerPhone = this.data.companySelect.phone;
        this.selectedUserEmails = this.data.companySelect.assignedPerson.email;
        break;
      case 'editStatus':
        this.statusName = this.data.statusSelected.name
        break;
      case 'editUser':
        this.roleList = this.data.roleList;
        this.roleSelected = this.data.userSelected.role.id
        this.userFullName = this.data.userSelected.name;
        this.userEmail = this.data.userSelected.email;
        this.userAddress = this.data.userSelected.address;
        this.userPhone = this.data.userSelected.phone;
        this.userRole = this.data.userSelected.role.id;
        this.isActive = this.data.userSelected.is_active;
        break;

    }
  }
  onClose(): void {

    this.dialogRef.close();
  }
  setVisibleForm(visibleFormId: number) {
    this.visibleFormId = visibleFormId
  }

  onSubmit(toDo: String): void {
    let dataBackConfig;
    switch (toDo) {
      case 'addNewCustomer':
        {
          debugger
          if (!this.companyName || this.companyName.trim().length < 3 || this.companyName.trim().length > 100) {
            // alert('Tên công ty phải có từ 3 đến 50 ký tự!');
            this.notificationComponent.addNotification("The company name must be between 3 and 50 characters!", 'warning');
            return;
          }
          if (!this.validateEmail(this.customerEmail)) {
            this.notificationComponent.addNotification("Invalid email!", 'warning');
            return;
          }
          const companyDTO = {
            companyName: this.companyName,
            email: this.customerEmail,
            phone: this.customerPhone,
            assigned_person: this.selectedUserEmails
          };
          dataBackConfig = { todo: toDo, companyDTO };
          this.dialogRef.close(dataBackConfig);
          break;
        }
      case 'editCustomer':
        {
          debugger
          if (!this.companyName || this.companyName.trim().length < 3 || this.companyName.trim().length > 100) {
            // alert('Tên công ty phải có từ 3 đến 50 ký tự!');
            this.notificationComponent.addNotification("The company name must be between 3 and 50 characters!", 'warning');
            return;
          }
          if (!this.validateEmail(this.customerEmail)) {
            this.notificationComponent.addNotification("Invalid email!", 'warning');
            return;
          }
          debugger
          const companyDTO = {
            companyName: this.companyName,
            email: this.customerEmail,
            phone: this.customerPhone,
            assigned_person: this.selectedUserEmails
          };
          const dataBackConfig = { todo: toDo, companyDTO };
          this.dialogRef.close(dataBackConfig);
          break;
        }
      case 'addNewStatus':
        {
          debugger
          if (!this.statusName || this.statusName.trim().length < 3 || this.statusName.trim().length > 100) {
            // alert('Tên công ty phải có từ 3 đến 50 ký tự!');
            this.notificationComponent.addNotification("The Status must be between 3 and 50 characters!", 'warning');
            return;
          }
          const statusDTO = { name: this.statusName }
          dataBackConfig = { todo: toDo, statusDTO }
          this.dialogRef.close(dataBackConfig);
          break;
        }
      case 'editStatus':
        {
          debugger
          if (!this.statusName || this.statusName.trim().length < 3 || this.statusName.trim().length > 100) {
            // alert('Tên công ty phải có từ 3 đến 50 ký tự!');
            this.notificationComponent.addNotification("The Status must be between 3 and 50 characters!", 'warning');
            return;
          }
          const statusDTO = { name: this.statusName }
          dataBackConfig = { todo: toDo, statusDTO }
          this.dialogRef.close(dataBackConfig);
          break;
        }
      case 'addNewUser':
        {
          debugger
          if (!this.userFullName) {
            this.notificationComponent.addNotification("Please enter your full name.!", 'warning');
            return;
          } else if (!this.validateFullName(this.userFullName)) {
            this.notificationComponent.addNotification("Invalid full name!", 'warning');
            return;
          }
          if (!this.validateEmail(this.userEmail)) {
            this.notificationComponent.addNotification("Invalid email!", 'warning');
            return;
          }
          if (!this.validatePhone(this.userPhone)) {
            this.notificationComponent.addNotification("Invalid phone number!", 'warning');
            return;
          }
          if (!this.validateAddress(this.userAddress)) {
            this.notificationComponent.addNotification("Invalid address!", 'warning');
            return;
          }
          if (!this.userRole) {
            this.notificationComponent.addNotification("Please enter user role!", 'warning');
            return;
          }

          const userDTO = {

          }
          break;
        }
      case 'editUser':
        {
          debugger
          if (!this.userFullName.trim()) {
            this.notificationComponent.addNotification("Please enter your full name.!", 'warning');
            return;
          } else if (!this.validateFullName(this.userFullName)) {
            this.notificationComponent.addNotification("Invalid full name!", 'warning');
            return;
          }
          if (!this.validateEmail(this.userEmail)) {
            this.notificationComponent.addNotification("Invalid email!", 'warning');
            return;
          }
          if (!this.validatePhone(this.userPhone)) {
            this.notificationComponent.addNotification("Invalid phone number!", 'warning');
            return;
          }
          if (!this.validateAddress(this.userAddress)) {
            this.notificationComponent.addNotification("Invalid address!", 'warning');
            return;
          }
          const userDTO = {
            fullName : this.userFullName,
            email : this.userEmail,
            address : this.userAddress,
            phone:this.userPhone,
            roleId: this.userRole,
            is_active: Number(this.isActive)
          }
          const dataBackConfig = { todo: toDo, userDTO };
          this.dialogRef.close(dataBackConfig);
          break;
        }
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  validateFullName(fullName: string): boolean {
    const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ\s]{3,50}$/;
    return nameRegex.test(fullName.trim());
  }
  validatePhone(phone: string): boolean {
    const phoneRegex = /^(?:\+?\d{1,3})?\d{9,14}$/;
    return phoneRegex.test(phone);
  }
  validateAddress(address: string): boolean {
    const addressRegex = /^[A-Za-zÀ-Ỹà-ỹ\s,.-]{5,100}$/;
    return addressRegex.test(address);
  }
}
