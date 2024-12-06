
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


@NgModule({
  declarations: [
    HomeComponent,//task
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    OrderConfirmComponent,
    LoginComponent,
    RegisterComponent,
    DetailProductComponent
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
     HomeComponent
    //OrderComponent
    //OrderConfirmComponent
    //LoginComponent
    //RegisterComponent
    //DetailProductComponent
  ]
})
export class AppModule { }

// 12:15