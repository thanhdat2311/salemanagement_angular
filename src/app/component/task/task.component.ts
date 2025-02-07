import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from 'src/app/services/task.service';
import { enviroment } from 'src/app/enviroment/enviroment';
import Swal from 'sweetalert2';
import { Company } from '../models/company';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/services/user.service';
import { TaskDTO } from 'src/app/dtos/task.dto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class HomeComponent implements OnInit {
  dropdownSettings = {};
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
  public dropdownList: { email: number; name: string }[] = [];
  selectedUsers: any[] = [];
  taskForm: FormGroup;
  isToDo: string | undefined = "";
  email: String = 'datmkt23112@gmail.com';
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
  constructor(private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Bắt buộc nhập title
      description: ['', Validators.required], // Bắt buộc nhập description
      action: ['', Validators.required], // Bắt buộc nhập actionz 
      urgent: [false, Validators.required], // Bắt buộc nhập urgent (boolean)
      status: [1, Validators.required], // Bắt buộc nhập status (number)
      assignedUsers: [[], Validators.required], // Bắt buộc có assignedUser (mảng email)
      startDate: ['', Validators.required], // Bắt buộc nhập startDate
      completedDate: ['', Validators.required], // Bắt buộc nhập completedDate
      companyId: [null, Validators.required] // Bắt buộc nhập companyId (number)
    });

  }
  ngOnInit() {
    this.getCompany(this.email);
    debugger
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'email',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.getAllUser()
    console.log(this.dropdownSettings)
  }



  // searchProducts(page: number,limit: number ,keyword: String,categoryId: number ){
  //   this.getProducts(page,limit,keyword,categoryId);
  // }
  onUserSelect(user: any) {

    console.log(this.taskForm.controls['assignedUsers'].getRawValue())
  }

  onUserDeselect(user: any) {

    console.log(this.taskForm.controls['assignedUsers'].getRawValue())
  }

  deleteTask(taskId:number|undefined){
    Swal.fire({
      title: 'Are you sure?'+taskId,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,       // Hiển thị nút Cancel
      confirmButtonColor: '#d63377',   // Màu cho nút xác nhận
      cancelButtonColor: '#A9A9A9', // Màu cho nút hủy
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true 
    }).then((result)=>{
      if(result.isConfirmed){
        this.taskService.deleteTask(this.selectedTask).subscribe({
          next: (response: any) => {
            debugger
            this.taskDetail = undefined;
            if(this.selectedCompany!=undefined){
            this.getTaskList(this.selectedCompany);
            };
            console.log(`delete:` + response)
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
              title: `Error: ${error.error}`,
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
    }

    )
  }
  getAllUser() {
    this.userService.getAllUser().subscribe({
      next: (response: any) => {
        debugger
        this.dropdownList = response;
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
          title: `Error: ${error.error}`,
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

  saveTask() {
    switch (this.isToDo) {
      case 'addnew':
        debugger
        // Logic cho trường hợp 'addnew'
        const assginedListNew = (this.taskForm.get('assignedUsers') as FormArray).getRawValue();
        const emailListNew = assginedListNew.map((user: { email: any; }) => user.email);                                                                
        this.taskForm.controls['companyId'].setValue(this.selectedCompany);
        this.taskForm.controls['assignedUsers'].setValue(emailListNew);
        this.taskDTO = {
          ...this.taskForm.value
        };
        this.taskService.createTask(this.taskDTO).subscribe({
          next: (response: any) => {
            debugger
            this.taskDetail = response;
            if(this.taskDetail != null && this.taskDetail != undefined){ 
              this.getTaskList(this.taskDTO.companyId)
            Swal.fire({
              position: 'center',
              icon: 'success',          // Biểu tượng error
              title: `Successfully!`,
              text: 'Create Task Successfully',
              width: '600px',
              padding: '1em',
              timer: 3000,                  // Thời gian tự động đóng (ms)
              timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
              confirmButtonText: 'OK'
            });
          } else{
            Swal.fire({
              position: 'center',
              icon: 'error',          // Biểu tượng error
              title: `Error: Add new unsuccessfully!`,
              text: 'An error occurred. Please try again later!',
              width: '600px',
              padding: '1em',
              timer: 8000,                  // Thời gian tự động đóng (ms)
              timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
              confirmButtonText: 'OK'
            });
          }
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
              title: `Error: ${error.error}`,
              text: 'An error occurred. Please try again later!',
              width: '600px',
              padding: '1em',
              timer: 5000,                  // Thời gian tự động đóng (ms)
              timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
              confirmButtonText: 'OK'
            });
          }
        }
        )

        break;
      case 'edit':
        // Logic cho trường hợp 'edit'
        debugger
        const assginedListEdit = (this.taskForm.get('assignedUsers') as FormArray).getRawValue();
        const emailListEdit = assginedListEdit.map((user: { email: any }) => user.email); // do form mang cả name ko truyền vào được                                                         
        this.taskForm.controls['assignedUsers'].setValue(emailListEdit);
        this.taskForm.controls['companyId'].setValue(this.selectedCompany); // companyId chỉ là number

        this.taskDTO = {
          ...this.taskDetail,
          ...this.taskForm.value
        };
        if(this.selectedTask!=undefined){
        this.taskService.updateTask(this.selectedTask,this.taskDTO).subscribe({
          next: (response: any) => {
            debugger
            this.taskDetail = response;
            if(this.taskDetail != null && this.taskDetail != undefined){ 
            Swal.fire({
              position: 'center',
              icon: 'success',          // Biểu tượng error
              title: `Successfully!`,
              text: 'Edit Task Successfully',
              width: '600px',
              padding: '1em',
              timer: 3000,                  // Thời gian tự động đóng (ms)
              timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
              confirmButtonText: 'OK'
            });
          } else{
            Swal.fire({
              position: 'center',
              icon: 'error',          // Biểu tượng error
              title: `Error: Edit unsuccessfully!`,
              text: 'An error occurred. Please try again later!',
              width: '600px',
              padding: '1em',
              timer: 8000,                  // Thời gian tự động đóng (ms)
              timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
              confirmButtonText: 'OK'
            });
          }
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
              title: `Error: ${error.error}`,
              text: 'An error occurred. Please try again later!',
              width: '600px',
              padding: '1em',
              timer: 5000,                  // Thời gian tự động đóng (ms)
              timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
              confirmButtonText: 'OK'
            });
          }
        }
        )
        } else{
          alert("Pls Select a Task")
        }

        console.log("is to do:" + this.isToDo);
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
    this.selectedTask = undefined;
    this.taskDetail = undefined;
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
    this.isToDo = "edit";
    this.selectedTask = idTask;
    this.taskService.getTaskDetail(idTask).subscribe({
      next: (response: Task) => {
        debugger
        this.taskDetail = response;
        this.taskForm.patchValue({
          ...this.taskDetail,
          status: this.taskDetail.status?.id ?? null
      });

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
