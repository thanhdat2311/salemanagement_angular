import { Component, OnInit } from '@angular/core';
import {  Task } from '../models/task';
import {  TaskService } from 'src/app/services/task.service';
import { enviroment } from 'src/app/enviroment/enviroment';
import Swal from 'sweetalert2';
import { Company } from '../models/company';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class HomeComponent implements OnInit {
  //search
  email: String ='datmkt2311@gmail.com';
  //categories
  companyId: number= 0;
  //products
companyList: Company[] = [];
taskDetail: Task | undefined;
taskList: Task[] = [];
currentPage: number = 0;
itemsPerPage: number = 12;
pages: number[] = [];
totalPages: number = 0;
visiblePages: number[] = [];
constructor(private taskService: TaskService){}
ngOnInit(){
  this.getCompany(this.email)
}
// searchProducts(page: number,limit: number ,keyword: String,categoryId: number ){
//   this.getProducts(page,limit,keyword,categoryId);
// }
getCompany(email: String){
  this.taskService.getCompany(email).subscribe({
    next: (response: any)=>{
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

getTaskList( idCompany: number){
  this.taskService.getTaskList(idCompany).subscribe({
    next: (response: Task[])=>{
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
getTaskDetail( idTask: number){
  this.taskService.getTaskDetail(idTask).subscribe({
    next: (response: Task)=>{
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
// onPageChange(page: number){
//   debugger
//   this.currentPage = page;
//   this.getProducts(this.currentPage, this.itemsPerPage, this.keyword, this.categoryId);
// }
  
generateVisiblePageArray(currentPage: number,totalPages: number):number[]{
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages/2);
  
  let startPage = Math.max(currentPage - halfVisiblePages,0);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if(endPage - startPage + 1 < maxVisiblePages){
    startPage = Math.max(endPage - maxVisiblePages + 1, 0 );
  }
  return new Array(endPage - startPage +1).fill(0).map((_,index) => startPage + index )
}
}
