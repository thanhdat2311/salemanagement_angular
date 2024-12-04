import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    isPhoneNumber,
    IsNumber
} from 'class-validator'
export class LoginDTO {
    @IsPhoneNumber()
    phone: string;
    @IsString()
    password: string;
    roleId: number;
    constructor(data: any) {
        this.phone = data.phone;
        this.password = data.password;
        this.roleId = data.role
    }
}