import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  activecard: string = "email";
  email: string = "";
  isEmailValid: boolean = false;
  otpvalue: string = "";
  countdown: number = 0;
  timer: any;
  newPassword: string = "";
  confirmPassword: string = "";


  checkEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.isEmailValid = emailPattern.test(this.email);
  }

  startCountdown() {
    this.countdown = 60;
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  resendOTP() {
    // Thực hiện gửi lại OTP
    this.startCountdown();
  }

  priviousEmail() {
    this.activecard = "email";
  }

  sendOTP() {
    this.activecard = "otp"

    this.startCountdown();
    this.otpvalue = "";
  }

  confirmOTP() {
    this.activecard = "reset";
  }

  hello() {
    alert("Hello!");
  }
}
