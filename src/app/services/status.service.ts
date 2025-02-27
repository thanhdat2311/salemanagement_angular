import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "../component/models/company";
import { Status } from "../component/models/status";

@Injectable({
    providedIn: "root"
  })
  export class StatusService {
    private apiGetStatus = `${enviroment.apiBaseUrl}/status`;
    private apiCreateStatus = `${enviroment.apiBaseUrl}/status`;
    private apiUpdateStatus = `${enviroment.apiBaseUrl}/status`;

    constructor(private http: HttpClient) { }
    private createHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      });
    }
    getStatus(): Observable<Status[]> {
        return this.http.get<Status[]>(this.apiGetStatus)
      }
    createStatus(statusDTO:any){
        return this.http.post(this.apiCreateStatus,statusDTO);
    }
    updateStatus(statusDTO:any,statusId:number){
      return this.http.put(`${this.apiUpdateStatus}/${statusId}`,statusDTO);
    }
  }