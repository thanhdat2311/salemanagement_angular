import {  AssignedPerson } from "./user";

export interface Company {
  id: number;
  companyName: string;
  email: string;
  phone: string;
  assignedPerson: AssignedPerson;
  createdAt: Date;
  updateAt: Date;
}