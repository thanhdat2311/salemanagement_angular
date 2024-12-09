import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // khai báo các biến tương ứng với field dữ liệu trên form
  phone: string;
  email:string;
  password: string;
  retypePassword: string;
  fullname: string;
  address: string;
  isCheck: boolean;
  isPhoneValid: boolean;
  constructor( private router: Router, private UserService: UserService ) {
    this.email = '',
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.address = '';
    this.fullname = '';
    this.isCheck = false;
    this.isPhoneValid = false;
    // inject dependency

  }
  register() {

    // Sử dụng Observer object
    const registerDTO:RegisterDTO =
    {
      "fullname":this.fullname,
      "email":this.email,
      "phone":this.phone,
      "address":this.address,
      "password":this.password,
      "retypePassword":this.retypePassword,
      "roleId":2,
      "is_active":1
    
    };
    this.UserService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        if ((response.phone !=0 )) {
          Swal.fire({
            position: 'center',
            icon: 'success',          // Biểu tượng thành công
            title: 'Successfully!',
            text:"",
            width: '600px',
            padding: '1em',
            timer: 5000,                  // Thời gian tự động đóng (ms)
            timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
            confirmButtonText: 'OK'   // Nút xác nhận
          })
        }
        else {
          // đăng ký không thành công
        
          
        }
      },
      complete: () => {
        debugger
      },
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
    })
   /* this.http.post(apiUrl, registerData, { headers: headers }).subscribe({
      next: (response: any) => {
        debugger
        if ((response.phone !=0 )) {
          Swal.fire({
            position: 'center',
            icon: 'success',          // Biểu tượng thành công
            title: 'Successfully!',
            text: message,
            width: '600px',
            padding: '1em',
            timer: 5000,                  // Thời gian tự động đóng (ms)
            timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
            confirmButtonText: 'OK'   // Nút xác nhận
          })
        }
        else {
          // đăng ký không thành công
        
          
        }
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        Swal.fire({
          position: 'center',
          icon: 'error',          // Biểu tượng error
          title: 'An error occurred. Please try again later!',
          text: message,
          width: '600px',
          padding: '1em',
          timer: 5000,                  // Thời gian tự động đóng (ms)
          timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
          confirmButtonText: 'OK'   // Nút xác nhận
        });
      }
    });*/
    
  }
  isCheckPassword() {
    if (this.password != this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({ 'PasswordIsCheck': true })
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null)
    }
  }
  isCheckAge() {

  }

}
