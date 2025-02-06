import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dtos';
import { enviroment } from '../enviroment/enviroment';
import { LoginResponse } from '../response/user/login.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${enviroment.apiBaseUrl}/user/register`;
  private apiLogin = `${enviroment.apiBaseUrl}/user/login`;
  private apiGetAllUser = `${enviroment.apiBaseUrl}/user/all`;
  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    });
  }
  register(registerDTO: RegisterDTO): Observable<any> {

    return this.http.post(this.apiRegister, registerDTO, { headers: this.createHeaders() })
  }
  login(loginDTO: LoginDTO):Observable<LoginResponse>  {
    debugger
    return this.http.post<LoginResponse>(this.apiLogin, loginDTO)
  }
  getAllUser(){
    return this.http.get(this.apiGetAllUser);
  }
}
