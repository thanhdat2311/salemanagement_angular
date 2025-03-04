import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";

@Injectable({
    providedIn: "root"
})
export class ResetPasswordService {
    private apiCreateCompany = `${enviroment.apiBaseUrl}/resetPassword/renderOtp`;

}