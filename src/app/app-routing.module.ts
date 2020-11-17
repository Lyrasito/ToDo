import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthguardService } from './services/authguard.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardAdminService } from './services/authguard-admin.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'create',
    component: CreateTaskComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthguardAdminService],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  { path: 'add-admin', component: AddAdminComponent },
  { path: '', component: TasksComponent, canActivate: [AuthguardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
