import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dtos';
import { enviroment } from '../enviroment/enviroment';
import { LoginResponse } from '../response/user/login.response';
import { UserResponse } from '../response/user/user.response';
import { ChangePasswordDTO } from '../dtos/user/changepassword.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${enviroment.apiBaseUrl}/user/register`;
  private apiLogin = `${enviroment.apiBaseUrl}/user/login`;
  private apiGetAllUser = `${enviroment.apiBaseUrl}/user/all`;
  private apiUserDetails = `${enviroment.apiBaseUrl}/user/details`;
  private apiUserChangePassword = `${enviroment.apiBaseUrl}/user/changePassword`;
  private apiUserUpdate = `${enviroment.apiBaseUrl}/user`;
  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    });
  }

  updateUser(userDTO:any, emailUser:string){
    return this.http.put(`${this.apiUserUpdate}/${emailUser}`,userDTO)
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
  getUserDetails(){
    return this.http.get(this.apiUserDetails);
  }

  saveUserToLocalStorage(userResponse: UserResponse){
    if(userResponse != null && userResponse != undefined){
  const userResponseJson = JSON.stringify(userResponse);
  localStorage.setItem('userDetails', userResponseJson);
  console.info("Set User Detail")}
  else{
    console.info("User Detail Set Fail!")
  }
  }
  getUserFromLocalStorage(){
    const userResponseJson = localStorage.getItem('userDetails');
    if(userResponseJson == null || userResponseJson == undefined){
      return null;
    }else{
      const userResponse = JSON.parse(userResponseJson)
      console.info("GetUserDetails")
      return userResponse
    }
  }
  changePassword(changepasswordDTO :ChangePasswordDTO): Observable<any>{
    return this.http.put(this.apiUserChangePassword, changepasswordDTO,{ headers: this.createHeaders() })
  }
}
