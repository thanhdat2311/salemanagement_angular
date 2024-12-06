import { Company } from "./company";
import { Status } from "./status";
import { AssignedPerson } from "./user";

export interface Task {
        id: number;
        title: string;
        description: string;
        action: string;
        urgent: boolean;
        assignedUser: AssignedPerson;
        startDate: string;
        company: Company;
        status: Status;
        completedDate: string;
        createdAt: string;
        updatedAt: string;
      }