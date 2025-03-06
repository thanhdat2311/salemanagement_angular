import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Task } from '../models/task';
import { TaskService } from 'src/app/services/task.service';
import { enviroment } from 'src/app/enviroment/enviroment';
import Swal from 'sweetalert2';
import { Company } from '../models/company';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/services/user.service';
import { TaskDTO } from 'src/app/dtos/task.dto';
import { Status } from '../models/status';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('expandAnimation', [
      state('void', style({ width: '0px', opacity: 0 })),
      state('*', style({ width: '80%', opacity: 1 })),
      transition('void <=> *', animate('0.3s ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  dropdownSettings = {};
  dropdownStatusSetting = {};
  status: Status[] = [];
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
  email: String = '';
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
  isOpenSearch = false;
  inputSearch:any;
  searchText:any;

  constructor(private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Bắt buộc nhập title
      description: ['', Validators.required], // Bắt buộc nhập description
      action: ['', Validators.required], // Bắt buộc nhập actionz 
      urgent: [false, Validators.required], // Bắt buộc nhập urgent (boolean)
      status: [[], Validators.required], // Bắt buộc nhập status (number)
      assignedUsers: [[], Validators.required], // Bắt buộc có assignedUser (mảng email)
      startDate: ['', Validators.required], // Bắt buộc nhập startDate
      completedDate: ['', Validators.required], // Bắt buộc nhập completedDate
      companyId: [null, Validators.required] // Bắt buộc nhập companyId (number)
    });

  }
  ngOnInit() {
    const userDetail = this.userService.getUserFromLocalStorage();
    this.email = userDetail.email;
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
    this.getStatus();
    this.getAllUser()
    console.log(this.dropdownSettings)
    this.dropdownStatusSetting = {
      singleSelection: true,  // Nếu bạn chỉ cho phép chọn một giá trị
      idField: 'id',  // Trường duy nhất để tham chiếu (ID của status)
      textField: 'name',  // Trường hiển thị trong dropdown (Tên của status)
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      searchPlaceholderText: 'Search...',
      noDataLabel: 'No Data Found'
    };
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

  deleteTask(taskId: number | undefined) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,       // Hiển thị nút Cancel
      confirmButtonColor: '#d63377',   // Màu cho nút xác nhận
      cancelButtonColor: '#A9A9A9', // Màu cho nút hủy
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(this.selectedTask).subscribe({
          next: (response: any) => {
            debugger
            this.taskDetail = undefined;
            if (this.selectedCompany != undefined) {
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
        this.addNotification(error.error, "error")

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
        const statusAddNew = (this.taskForm.get('status') as FormArray).getRawValue();
        const statusId = statusAddNew.map((status: { id: any; }) => status.id);
        this.taskForm.controls['companyId'].setValue(this.selectedCompany);
        this.taskForm.controls['assignedUsers'].setValue(emailListNew);
        this.taskForm.controls['status'].setValue(statusId[0]);
        this.taskDTO = {
          ...this.taskForm.value
        };
        this.taskService.createTask(this.taskDTO).subscribe({
          next: (response: any) => {
            debugger
            this.taskList = response;
            if (this.taskList != null && this.taskList != undefined) {
              //this.getTaskList(this.taskDTO.companyId)
              this.addNotification("Add new Successfully", "success")
              this.clearForm()
            } else {
              this.addNotification("Add new Unsuccessfully", "error")

            }
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

        break;
      case 'edit':
        // Logic cho trường hợp 'edit'
        debugger
        const assginedListEdit = (this.taskForm.get('assignedUsers') as FormArray).getRawValue();
        const emailListEdit = assginedListEdit.map((user: { email: any }) => user.email); // do form mang cả name ko truyền vào được                                                         
        this.taskForm.controls['assignedUsers'].setValue(emailListEdit);
        this.taskForm.controls['companyId'].setValue(this.selectedCompany); // companyId chỉ là number
        const statusEdit = (this.taskForm.get('status') as FormArray).getRawValue();
        const statusIdEdit = statusEdit.map((status: { id: any; }) => status.id);
        this.taskForm.controls['status'].setValue(statusIdEdit[0]);

        this.taskDTO = {
          ...this.taskDetail,
          ...this.taskForm.value
        };
        if (this.selectedTask != undefined) {
          this.taskService.updateTask(this.selectedTask, this.taskDTO).subscribe({
            next: (response: any) => {
              debugger
              this.taskDetail = response;
              if (this.taskDetail != null && this.taskDetail != undefined) {
                this.addNotification("Edit Task", "success");
                const companyId = this.selectedCompany ? Number(this.selectedCompany) : 0;
                this.getTaskList(companyId);
                this.clearForm()
              } else {
                this.addNotification("unsuccessfully", "error");

              }
            }
            ,
            complete: () => {
              debugger;
            }
            ,
            error: (error: any) => {
              debugger
              this.addNotification(error.error, "error");
            }
          }
          )
        } else {
          this.addNotification("Select a task", "warning");
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
      this.addNotification("Please select a company!", "warning")
    }
  }
  clearForm() {
    this.taskForm.reset();
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
      created_at: '',
      updated_at: ''
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
        this.addNotification(error.error,"error")

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
          title: this.taskDetail.title,
          description: this.taskDetail.description,
          action: this.taskDetail.action,
          urgent: this.taskDetail.urgent,
          assignedUsers: this.taskDetail.assignedUsers,
          startDate: this.taskDetail.startDate,
          completedDate: this.taskDetail.completedDate,
          companyId: this.taskDetail.company?.id
        });
        // const assginedListNew = (this.taskForm.get('assignedUsers') as FormArray).getRawValue();
        // const emailListNew = assginedListNew.map((user: { email: any; }) => user.email);
        // this.taskForm.controls['assignedUsers'].setValue(emailListNew);

        // Gán giá trị cho dropdown status
        this.taskForm.controls['status'].setValue([this.taskDetail.status]);

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
  getStatus() {

    this.taskService.getStatus().subscribe({
      next: (response: any) => {
        debugger
        this.status = response;

      }
      ,
      complete: () => {
        debugger;
      }
      ,
      error: (error: any) => {
        debugger
        this.addNotification(error.error,"error")
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
  addNotification(content: string, type: 'info' | 'warning' | 'error' | 'success') {
    this.notificationComponent.addNotification(content, type);
  }

  toggleSearch() {
    if (!this.searchText) {
      this.isOpenSearch = !this.isOpenSearch;
    } else {
      // Call function to search
    }
  }
  enterInputSearch(inputSearch:string){
    this.searchText = inputSearch.trim()
  }
}
