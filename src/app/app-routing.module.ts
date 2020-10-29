import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component'
import { AuthguardService } from './authguard.service';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [{
  path: "login", component: LoginComponent
}, {
  path: "home", component: HomeComponent, canActivate: [AuthguardService]
}, {
  path: "tasks", component: TasksComponent, canActivate: [AuthguardService]
}, {
  path: "create", component: CreateTaskComponent, canActivate: [AuthguardService]
}]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
