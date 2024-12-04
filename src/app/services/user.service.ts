import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dtos';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin = `${enviroment.apiBaseUrl}/users/login`;
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
  login(loginDTO: LoginDTO): Observable<any> {
    debugger
    return this.http.post(this.apiLogin, loginDTO, { headers: this.createHeaders() })
  }
}
