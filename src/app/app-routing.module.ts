import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { HomeComponent } from "./component/task/task.component";
import { ConfigurationComponent } from "./component/configuration/configuration.component";
import { NgModule } from "@angular/core";
import { ResetpasswordComponent } from "./component/resetpassword/resetpassword.component";
import { ChangepasswordComponent } from "./component/changepassword/changepassword.component";
import { ProfileComponent } from "./component/profile/profile.component";

const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
   // {path:'products/:id', component: DetailProductComponent},
    {path:'configuration', component:ConfigurationComponent},
    {path:'register', component:RegisterComponent},
    {path:'resetPassword', component:ResetpasswordComponent},
    {path:'changePassword', component:ChangepasswordComponent},
    {path:'myProfile', component:ProfileComponent}





]; 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}