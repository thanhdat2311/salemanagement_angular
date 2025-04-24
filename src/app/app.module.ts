
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './component/task/task.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, 
          HTTP_INTERCEPTORS 
        } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { Routes } from '@angular/router';
import { CompanyComponent } from './component/company/company.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopupComponent } from './component/popup/popup.component';
import { MatOption, MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { NotificationComponent } from './component/notification/notification.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterPipe } from './filter.pipe';
import { ConfigurationComponent } from './component/configuration/configuration.component';
import { LoadingComponent } from './component/loading/loading.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Trang chủ
  { path: 'login', component: LoginComponent } // Trang đăng nhập
];

@NgModule({
  declarations: [
    //AppComponent,
    LoginComponent,
    HomeComponent,//task
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    CompanyComponent,
    PopupComponent,
    ChangepasswordComponent,
    ResetpasswordComponent,
    NotificationComponent,
    ProfileComponent,
    AppComponent,
    ConfigurationComponent,
    LoadingComponent,
    FilterPipe,
    DashboardComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()  ,  
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
  }],
  bootstrap: [
    AppComponent

  ]
})
export class AppModule { }

// 12:15