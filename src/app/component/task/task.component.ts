import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from 'src/app/services/task.service';
import { enviroment } from 'src/app/enviroment/enviroment';
import Swal from 'sweetalert2';
import { Company } from '../models/company';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class HomeComponent implements OnInit {
  dropdownSettings = {};
  // dropdownList: { item_id: number; item_text: string; }[] = [];
  public dropdownList: { item_id: number; item_text: string }[] = [];

  taskForm: FormGroup;
  isToDo: string | undefined = "";
  email: String = 'datmkt2311@gmail.com';
  companyId: number = 0;
  selectedCompany: number | undefined = undefined;
  selectedTask: number | undefined;
  companyList: Company[] = [];
  taskDetail: Task | undefined;
  taskList: Task[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  constructor(private taskService: TaskService, private fb: FormBuilder) { 
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Bắt buộc nhập title
      description: ['', Validators.required], // Bắt buộc nhập description
      action: ['', Validators.required], // Bắt buộc nhập action
      urgent: [false, Validators.required], // Bắt buộc nhập urgent (boolean)
      status: [null, Validators.required], // Bắt buộc nhập status (number)
      assignedUsers: ['', Validators.required], // Bắt buộc có assignedUser (mảng email)
      startDate: ['', Validators.required], // Bắt buộc nhập startDate
      completedDate: ['', Validators.required], // Bắt buộc nhập completedDate
      companyId: [null, Validators.required] // Bắt buộc nhập companyId (number)
    });
    
  }
  ngOnInit() {
    this.getCompany(this.email);
    debugger
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    } ;
    console.log(this.dropdownSettings)
  }
  
  
  
  // searchProducts(page: number,limit: number ,keyword: String,categoryId: number ){
  //   this.getProducts(page,limit,keyword,categoryId);
  // }
  saveTask() {
    switch (this.isToDo) {
      case 'addnew':
        // Logic cho trường hợp 'addnew'
        console.log('Add New Task');
        break;
      case '':
        // Logic cho trường hợp 'edit'
        console.log('Editing Task');
        break;
      default:
        // Logic cho các trường hợp khác
        console.log('No specific task');
    }
  }
  changeTODO(todo: string) {
    if (this.selectedCompany != undefined) {
      switch (todo) {
        case 'addnew':
          this.clearForm();
          this.selectedTask = 0;
          this.isToDo = todo;
          break;
        default:
          // Logic mặc định nếu không có điều kiện nào khớp
          break;
      }
    } else {
      alert("Please select a company!")
    }
  }
  clearForm() {
    this.taskDetail = {
      id: 0, // Hoặc null tùy vào logic của bạn
      title: '',
      description: '',
      action: '',
      urgent: false,
      assignedUsers: undefined,
      startDate: '',
      company: undefined,
      status: undefined,
      completedDate: '',
      createdAt: '',
      updatedAt: ''
    };
  }
  getCompany(email: String) {
    this.isToDo = "";
    this.taskService.getCompany(email).subscribe({
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
        Swal.fire({
          position: 'center',
          icon: 'error',          // Biểu tượng error
          title: `Error: ${error.error.error}`,
          text: 'An error occurred. Please try again later!',
          width: '600px',
          padding: '1em',
          timer: 8000,                  // Thời gian tự động đóng (ms)
          timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
          confirmButtonText: 'OK'
        });

      }
    }
    )
  }

  getTaskList(idCompany: number) {
    this.isToDo = "";
    this.selectedCompany = idCompany;
    this.taskService.getTaskList(idCompany).subscribe({
      next: (response: Task[]) => {
        debugger
        this.taskList = response;
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
  getTaskDetail(idTask: number) {
    this.isToDo = "";
    this.selectedTask = idTask;
    this.taskService.getTaskDetail(idTask).subscribe({
      next: (response: Task) => {
        debugger
        this.taskDetail = response;
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

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 0);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index)
  }
}
