import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { Observable } from "rxjs";
import { Role } from "../component/models/role";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn:'root'
}
)
export class RoleService{
    private apiGetRoles = `http://localhost:8088/salemanagement/v1/role`
    constructor(private http: HttpClient){}
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'en'
        });
      }
        getRoles(){
            return this.http.get(this.apiGetRoles, { headers: this.createHeaders() })
        }
    
}