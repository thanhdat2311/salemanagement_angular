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
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  email: string;
  password: string;
  roles: Role[] = [];
  selectedRole: Role | undefined;
  role: number;
  constructor(private router: Router,
    private userService: UserService,
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

  ngOnInit() {
    debugger

  }
  getUserDetails() {
    debugger
    this.userService.getUserDetails().subscribe({

      next: (response: any) => {
        debugger
        this.userService.saveUserToLocalStorage(response)


      },
      complete: () => {

      },
      error: (error: any) => {
        debugger

      }
    })
  }
  login() {
    debugger
    // Sử dụng Observer object
    const loginDTO: LoginDTO =
    {
      "email": this.email,
      "password": this.password,
      "roleId": 1
    };

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const message = `${response?.message}`
        const token = `${response.token}`;
        this.tokenService.setToken(token);
        this.notificationComponent.addNotification("Login Successfully!", "success");
        this.router.navigate(['/home'])
      },
      complete: () => {
        this.getUserDetails();

      },
      error: (error: any) => {
        debugger
        this.notificationComponent.addNotification("Login fail!", "error");
      }
    })
  }
}

// Login Response