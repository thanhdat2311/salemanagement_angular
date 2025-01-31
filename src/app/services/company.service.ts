import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "../component/models/company";

@Injectable({
    providedIn: "root"
  })
  export class TaskService {
    private apiCreateCompany = `${enviroment.apiBaseUrl}/company`;
    
  
    constructor(private http: HttpClient) { }
    private createHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      });
    }
    createCompany(company: Company) {
      return this.http.get<Company[]>(this.apiCreateCompany)
    }
  }