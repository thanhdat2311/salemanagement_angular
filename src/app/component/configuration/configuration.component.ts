import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { Company } from '../models/company';
import { Status } from '../models/status';
import { AssignedPerson } from '../models/user';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit{
  companyList: Company[] = [];
  statusList: Status[] = [];
  userList: AssignedPerson[] = [];
  constructor(private taskService: TaskService,
    private userService: UserService,
    private comapnyService: CompanyService,
    private fb: FormBuilder) {

  }
  ngOnInit() {
  this.getAllCompany();
  this.getAllStatus();
  this.getAllUser();
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
