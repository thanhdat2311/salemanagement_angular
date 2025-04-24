import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedPerson } from '../models/user';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../models/company';
import { NotificationComponent } from '../notification/notification.component';
import { Role } from '../models/role';
import { TaskDTO } from 'src/app/dtos/task.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from 'class-validator';
import { Task } from '../models/task';
import { Status } from '../models/status';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  visibleFormId: number = 0;
  numberTest: number = 2;

  // for task
  taskForm: FormGroup;
  taskDetail: Task | undefined;
  taskDTO: TaskDTO = {
    "title": "",
    "description": "",
    "action": "",
    "urgent": 0,
    "status": 1,
    "assignedUsers": [],
    "startDate": "",
    "completedDate": "",
    "companyId": 0
  };

  // for dashboard
  title: string = '';
  descriptionPost: string = '';

  // for Role
  roleSelected?: Role;
  roleList: Role[] = []
  // For Customer
  companyList: Company[] = [];
  companyName: string = '';
  customerEmail: string = '';
  userList: AssignedPerson[] = [];
  selectedUserEmails: string[] = [];
  customerPhone: string = '';

  // For Status
  statusName: string = '';
  statusColor: string = '#ffffff'; // Default color 
  statusList: Status[] = [];
  // For User
  userFullName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userAddress: string = '';
  userRole: number = 0;
  isActive: boolean = true;
  assigned_person: string[] = [];

  // For Post 
  newPost: string = '';
  description: string = '';
  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Bắt buộc nhập title
      description: ['', Validators.required], // Bắt buộc nhập description
      action: ['', Validators.required], // Bắt buộc nhập actionz 
      urgent: [0, Validators.required], // Bắt buộc nhập urgent (boolean)
      status: [1, Validators.required], // Bắt buộc nhập status (number)
      assignedUsers: [[], Validators.required], // Bắt buộc có assignedUser (mảng email)
      startDate: ['', Validators.required], // Bắt buộc nhập startDate
      completedDate: ['', Validators.required], // Bắt buộc nhập completedDate
      companyId: [null, Validators.required] // Bắt buộc nhập companyId (number)
    });
  }
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
      case 'addNewUser':
        this.roleList = this.data.roleList;
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
      case 'editStatus':
        this.statusColor = this.data.statusSelected.color
        break;
      case 'addNewTask':
        this.roleList = this.data.roleList;
        this.userList = this.data.userList;
        this.companyList = this.data.companyList;
        this.statusList = this.data.statusList
        break;
      case 'editTask':
        this.roleList = this.data.roleList;
        this.userList = this.data.userList;
        this.companyList = this.data.companyList;
        this.statusList = this.data.statusList
        this.taskDetail = this.data.taskSelected
        this.taskForm.patchValue({
          title: this.taskDetail!.title,
          description: this.taskDetail!.description,
          action: this.taskDetail!.action,
          urgent: this.taskDetail!.urgent,
          assignedUsers: this.taskDetail!.assignedUsers?.map(user => user.email), // trả về mảng email
          startDate: this.taskDetail!.startDate,
          completedDate: this.taskDetail!.completedDate,
          companyId: this.taskDetail!.company?.id, // vì form dùng companyId
          status: this.taskDetail!.status?.id      // vì form dùng status (id)
        });

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
          const statusDTO = { name: this.statusName, color: this.statusColor }
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
          const statusDTO = { name: this.statusName, color: this.statusColor }
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
            fullName: this.userFullName,
            email: this.userEmail,
            address: this.userAddress,
            phone: this.userPhone,
            roleId: this.userRole,
            is_active: Number(this.isActive)
          }
          const dataBackConfig = { todo: toDo, userDTO };
          this.dialogRef.close(dataBackConfig);
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
            fullName: this.userFullName,
            email: this.userEmail,
            address: this.userAddress,
            phone: this.userPhone,
            roleId: this.userRole,
            is_active: Number(this.isActive)
          }
          const dataBackConfig = { todo: toDo, userDTO };
          this.dialogRef.close(dataBackConfig);
          break;
        }
      case 'addNewTask':
        {
          debugger
          const taskDTO = this.createTaskDTO();
          const dataBackConfig = { todo: toDo, taskDTO };
          this.dialogRef.close(dataBackConfig);
          break;
        }
      case 'editTask':
        {
          debugger
          const taskDTO = this.createTaskDTO();
          const dataBackConfig = { todo: toDo, taskDTO };
          this.dialogRef.close(dataBackConfig);
          break;
        }
    }
  }

  createTaskDTO(): TaskDTO {
    const formValue = this.taskForm.value;
    console.info(formValue.startDate)
    // Chuyển đổi Date thành string (định dạng YYYY-MM-DD)
    // const formatDate = (date: Date | null): string => {
    //   if (!date) return '';
    //   return date.toISOString().split('T')[0]; // Ví dụ: "2003-12-13"
    // };

    const taskDTO: TaskDTO = {
      title: formValue.title || '',
      description: formValue.description || '',
      action: formValue.action || '',
      urgent: formValue.urgent ? 1 : 0,
      status: formValue.status || 0,
      assignedUsers: formValue.assignedUsers || [],
      startDate: formValue.startDate,//formatDate(formValue.startDate), 
      completedDate: formValue.completedDate,//formatDate(formValue.completedDate), 
      companyId: formValue.companyId || 0
    };

    return taskDTO;
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
