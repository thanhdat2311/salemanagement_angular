import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    isPhoneNumber,
    IsNumber,
    IsEmail
} from 'class-validator'
export class ChangePasswordDTO {
    @IsString()
    oldPassword: string;
    @IsString()
    newPassword: string;
    retypePassword:string;
    constructor(data: any) {
        this.oldPassword = data.oldPassword;
        this.newPassword = data.newPassword;
        this.retypePassword = data.retypePassword;

    }
}