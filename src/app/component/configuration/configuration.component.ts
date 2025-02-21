import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { Company } from '../models/company';
import { Status } from '../models/status';
import { AssignedPerson } from '../models/user';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) translateX(100%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0) translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(0) translateX(100%)' }))
      ])
    ])
  ]
})
export class ConfigurationComponent implements OnInit{
  companyList: Company[] = [];
  statusList: Status[] = [];
  userList: AssignedPerson[] = [];
  companySelected: number = 0;
  form : string = "";
  barSelected: number = 1;
  statusSelected: number = 0;
  emailUser: string = '';
  barList: { id: number; name: string }[] = [];
  notifications: { id: number; content: string; type: 'info' | 'warning' | 'error' }[] = [];
  constructor(private taskService: TaskService,
    private userService: UserService,
    private comapnyService: CompanyService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit() {
  this.getAllCompany();
  this.getAllStatus();
  this.getAllUser();

  this.barList = [
    {id:1, name: "Customer"},
    {id:2, name: "Status"},
    {id:3, name: "User"}]
  }
  openPopup(): void {
    const userListPopUp = {barId:this.barSelected,userList: this.userList}
    console.info(userListPopUp)
    this.dialog.open(PopupComponent, {
      width: '500px',  // Chiều rộng popup
      disableClose: false,
      data: userListPopUp
    })
  };
  onCanceled(){
    this.form =""
  }
  onBarSelected(barID : number){
    this.barSelected = barID;
    this.form =""
  }
  onCompanySelected(companyId : number, formName: string){
    this.companySelected = companyId;
    this.form = formName;
  }
  onUserSelected(email: string, formUSer: string){
    debugger
    this.emailUser = email;
    this.form = formUSer;
  }
  onStatusSelected(statusId : number, formStatus: string){
    this.statusSelected = statusId;
    this.form = formStatus;
  }

  getAllUser(){
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
  getAllStatus(){
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

  getAllCompany(){
      this.comapnyService.getAllCompany().subscribe({
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

  addNotification(content: string, type: 'info' | 'warning' | 'error') {
    const id = Date.now();

    // Nếu đã có 5 thẻ, xóa thẻ cũ nhất
    if (this.notifications.length >= 5) {
      this.notifications.shift();
    }

    this.notifications.push({ id, content, type });

    setTimeout(() => {
      this.removeNotification(id);
    }, 40000);
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getHeaderNotification(type: string): string {
    switch (type) {
      case 'info': return 'Thông báo';
      case 'warning': return 'Cảnh báo';
      case 'error': return 'Lỗi';
      default: return '';
    }
  }

}
