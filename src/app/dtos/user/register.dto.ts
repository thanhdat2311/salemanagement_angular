import{
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    isPhoneNumber,
    IsEmail
} from 'class-validator'
export class RegisterDTO {
    @IsString()
    fullname: string ;
    email: string;
    @IsPhoneNumber()
    phone: string;
    @IsString()
    address: string;
    @IsString()
    password: string;
    @IsString()
    retypePassword: string;
    roleId: number;
    is_active: number;
    constructor(data: any) {
        this.fullname = data.fullname;
        this.phone= data.phone;
        this.address= data.address;
        this.password= data.password;
        this.retypePassword= data.retypePassword;
        this.roleId= data.role_id || 2;
        this.is_active= data.is_active;
        this.email= data.email;

    }
}