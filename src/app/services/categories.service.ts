import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { Categories } from "../component/models/categories";

@Injectable({
    providedIn: "root"
})
export class CategoriesService{
private apiGetCategories = `${enviroment.apiBaseUrl}/categories`;
constructor(private http: HttpClient){}
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'en'
        });
      }
    getCategories(){
      return this.http.get<Categories[]>(this.apiGetCategories)
    }
}