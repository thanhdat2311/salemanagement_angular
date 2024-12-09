import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../component/models/task";
import { Observable } from "rxjs";
import { enviroment } from "../enviroment/enviroment";
import { Company } from "../component/models/company";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  private apiGetCompany = `${enviroment.apiBaseUrl}/company/assignedPerson`;
  private apiGetListTask = `${enviroment.apiBaseUrl}/tasks/company`;
  private apirGetTaskDetail = `${enviroment.apiBaseUrl}/tasks/taskId`;

  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    });
  }
  getCompany(email: String): Observable<Company[]> {
    const params = new HttpParams().set('email', email.toString());
    return this.http.get<Company[]>(this.apiGetCompany, { params })
  }
  getTaskList(companyId: number): Observable<Task[]> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<Task[]>(this.apiGetListTask, { params })
  }
  getTaskDetail(taskId: number): Observable<Task> {
    const params = new HttpParams().set('taskId', taskId.toString());
    return this.http.get<Task>(this.apirGetTaskDetail, { params })
  }
}