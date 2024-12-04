import{
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    isPhoneNumber
} from 'class-validator'
export class RegisterDTO {
    @IsString()
    fullname: string ;
    @IsPhoneNumber()
    phone: string;
    @IsString()
    address: string;
    @IsString()
    password: string;
    @IsString()
    retypePassword: string;
    @IsDate()
    date_of_birth: Date;
    facebook_account_id: number;
    google_account_id: number;
    role_id: number;
    is_active: number;
    constructor(data: any) {
        this.fullname = data.fullname;
        this.phone= data.phone;
        this.address= data.address;
        this.password= data.password;
        this.retypePassword= data.retypePassword;
        this.date_of_birth= data.date_of_birth;
        this.facebook_account_id= data.facebook_account_id || 0;
        this.google_account_id= data.google_account_id || 1;
        this.role_id= data.role_id || 1;
        this.is_active= data.is_active;
    }
}