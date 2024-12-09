import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    isPhoneNumber,
    IsNumber,
    IsEmail
} from 'class-validator'
export class LoginDTO {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    roleId:number|2;
    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
        this.roleId = data.roleId;

    }
}