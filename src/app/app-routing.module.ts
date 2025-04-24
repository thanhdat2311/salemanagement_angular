import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { HomeComponent } from "./component/task/task.component";
import { NgModule } from "@angular/core";
import { ResetpasswordComponent } from "./component/resetpassword/resetpassword.component";
import { ChangepasswordComponent } from "./component/changepassword/changepassword.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuardFn } from "./component/guards/auth.guard";
import { ConfigurationComponent } from "./component/configuration/configuration.component";
import { AdminGuard } from "./component/guards/admin.guard";
import { DashboardComponent } from "./component/dashboard/dashboard.component";

const routes: Routes = [
    {path:'home', component: HomeComponent, canActivate:[AuthGuardFn]},
    {path:'login', component: LoginComponent},
    {path:'', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'configuration', component:ConfigurationComponent,canActivate:[AdminGuard] },
    {path:'changePassword', component:ChangepasswordComponent,  canActivate:[AuthGuardFn]},
    {path:'myProfile', component:ProfileComponent, canActivate:[AuthGuardFn] },
    {path:'resetPassword', component:ResetpasswordComponent },
    {path:'dashboard', component:DashboardComponent }
]; 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}