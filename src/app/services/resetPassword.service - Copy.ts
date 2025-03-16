import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ResetPasswordService {
    private apiSendOtp = `${enviroment.apiBaseUrl}/resetPassword/renderOtp`;
    private apiOtp = `${enviroment.apiBaseUrl}/resetPassword/confirmOtp`;
    constructor(private http: HttpClient) {
    }
    sendOtp(emailReset: string) {
        const resetPasswordDTO = {
            "email": emailReset
        }
       return this.http.post(this.apiSendOtp,resetPasswordDTO)
    }
    confirmOtp(otp: string) {
        const otpDTO = {
            "otp": otp
        }
       return this.http.post(this.apiOtp,otpDTO)
    }
}