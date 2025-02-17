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
import { UserResponse } from 'src/app/response/user/user.response';
import { ChangePasswordDTO } from 'src/app/dtos/user/changepassword.dto';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  @ViewChild('changePasswordForm') changePasswordForm!: NgForm;
  oldPassword: string = '';
  newPassword: string = '';
  email: string = '';
  retypePassword: string = '';
  selectedRole: Role  | undefined;
  role:number = 0;
  constructor(private router: Router, 
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {
  }
  changePassword() {
    debugger
    const changepasswordDTO : ChangePasswordDTO = {
      "oldPassword": this.oldPassword,
      "newPassword": this.newPassword,
      "retypePassword": this.retypePassword
    }
    this.userService.changePassword(changepasswordDTO).subscribe({
      next: (response: any) => {
        debugger
        Swal.fire({
          position: 'center',
          icon: 'success',          // Biểu tượng thành công
          title: 'Successfully!',
          text: 'success',
          width: '600px',
          padding: '1em',
          timer: 5000,                  // Thời gian tự động đóng (ms)
          timerProgressBar: true,       // Hiển thị thanh tiến trình thời gian
          confirmButtonText: 'OK'   // Nút xác nhận
        })
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
}
