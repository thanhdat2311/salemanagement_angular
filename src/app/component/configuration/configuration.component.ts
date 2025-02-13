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

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
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
  constructor(private taskService: TaskService,
    private userService: UserService,
    private comapnyService: CompanyService,
    private fb: FormBuilder,
    public dialog: MatDialog
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
    this.dialog.open(PopupComponent, {
      width: '500px',  // Chiều rộng popup
      height: '300px', // Chiều cao popup
      disableClose: false
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
}
