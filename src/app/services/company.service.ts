import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "../component/models/company";

@Injectable({
    providedIn: "root"
  })
  export class CompanyService {
    private apiCreateCompany = `${enviroment.apiBaseUrl}/company`;
    private apiGetAllCompany = `${enviroment.apiBaseUrl}/company/admin`;
    private apiUpdateCompany = `${enviroment.apiBaseUrl}/company`;
  
    constructor(private http: HttpClient) { }
    private createHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      });
    }
    createCompany(companyDTO: any) {
      return this.http.post<any>(this.apiCreateCompany, companyDTO)
    }
    getAllCompany(){
      return this.http.get<Company[]>(this.apiGetAllCompany)
    }
    updateCompany(companyDTO: any, companyId:number){
      return this.http.put<any>(`${this.apiUpdateCompany}/${companyId}`,companyDTO)
    }
  }