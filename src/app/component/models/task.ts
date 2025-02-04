import { Company } from "./company";
import { Status } from "./status";
import { AssignedPerson } from "./user";

export interface Task {
        id: number;
        title: string;
        description: string;
        action: string;
        urgent: boolean;
        assignedUsers: AssignedPerson[]|undefined;
        startDate: string;
        company: Company|undefined;
        status: Status|undefined;
        completedDate: string;
        createdAt: string;
        updatedAt: string;
      }