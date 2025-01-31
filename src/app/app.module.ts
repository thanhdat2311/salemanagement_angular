
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './component/task/task.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { OrderComponent } from './component/order/order.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, 
          HTTP_INTERCEPTORS 
        } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { Routes } from '@angular/router';
import { CompanyComponent } from './component/company/company.component';
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
    OrderComponent,
    OrderConfirmComponent,
    RegisterComponent,
    DetailProductComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
  }],
  bootstrap: [
    //CompanyComponent,
    //LoginComponent, 
    HomeComponent,
    //OrderComponent
    //OrderConfirmComponent
    //RegisterComponent
    //DetailProductComponent
  ]
})
export class AppModule { }

// 12:15