import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dtos';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { LoginResponse } from 'src/app/response/user/login.response';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  email: string;
  password: string;
  roles: Role[] = [];
  selectedRole: Role  | undefined;
  role:number;
  constructor(private router: Router, 
    private UserService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {
    this.email = '',
    this.password = '',
    this.role = 0
  }
  onPhoneChange() {
    console.log(`Phone type: ${this.email}`);
  }
  onRoleChange(event: any) {
    console.log('Role selected:', this.selectedRole);
  }
  
  ngOnInit(){
    debugger
    
  }
  login() {
    debugger
    // Sử dụng Observer object
    const loginDTO: LoginDTO =
    {
      "email": this.email,
      "password": this.password,
      "roleId":2
    };
  
    this.UserService.login(loginDTO).subscribe({
      next: (response: any) => {
      debugger
        //const message = `${response?.message}`
        const  token = response;
        this.tokenService.setToken(token);
        if ((response != null)) {
          Swal.fire({
            position: 'center',
            icon: 'success',          // Biểu tượng thành công
            title: 'Successfully!',
            text: `${response.token}`,
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
        
      },
      error: (error: any) => {
        debugger
        Swal.fire({
          position: 'center',
          icon: 'error',          // Biểu tượng error
          title: `${error.error}`,
          text: 'An error occurred. Please try again later!',
          width: '600px',
          padding: '1em',
          timer: 8000,                  // Thời gian tự động đóng (ms)
          timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
          confirmButtonText: 'OK'
        });
      }
    })
  }
}
