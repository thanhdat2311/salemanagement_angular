import { Role } from "src/app/component/models/role";

export interface UserResponse {

    id: number;
    email: string;
    name: string;
    phone: string;
    address: string;
    role: Role;
}