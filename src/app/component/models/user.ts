import { Role } from "./role";

export interface AssignedPerson {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_active: number | null; 
  role: Role;
}
