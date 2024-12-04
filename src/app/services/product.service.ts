import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../component/models/product";
import { Observable } from "rxjs";
import { enviroment } from "../enviroment/enviroment";
import { Categories } from "../component/models/categories";

@Injectable({
    providedIn: "root"
})
export class ProductService{
private apiGetProducts = `${enviroment.apiBaseUrl}/products`;
private apiGetCategories = `${enviroment.apiBaseUrl}/categories`;
constructor(private http: HttpClient){}
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'en'
        });
      }
    getProducts(page: number, limit: number, keyword: String, categoryId: number): Observable<Product[]>{
        const params = new HttpParams().set('page', page.toString())
                                        .set('limit',limit.toString())
                                        .set('keyword', keyword.toString())
                                        .set('categoryId', categoryId.toString())
        return this.http.get<Product[]>(this.apiGetProducts, {params})
    }
   
}