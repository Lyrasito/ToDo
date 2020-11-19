import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Task } from '../task';
//import {TASKS} from "../TASKS"
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  completedFilter: Boolean;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks().subscribe(
      //default sort by completed
      (tasks) => {
        // console.log(tasks);
        this.tasks = tasks.sort(function (a, b) {
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        });
        console.log(this.tasks);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /*
  refreshToken() {
    // let refreshToken = localStorage.getItem('refreshToken');
    this.authService.refresh().subscribe((response) => {
      //console.log("first refresh", localStorage.getItem('refreshToken'))
      this.authService.setToken(response.accessToken, response.refreshToken);
      // console.log("second refresh", localStorage.getItem('userToken'), localStorage.getItem('refreshToken'))
    });
  }
  */
  deleteTask(id) {
    let index = this.tasks.findIndex((task) => task._id === id);
    this.tasks.splice(index, 1);
    this.tasksService
      .deleteTask(id)
      .subscribe((response) => console.log(response));
  }
  markCompleted(id) {
    // console.log(id);
    let task = this.tasks.find((task) => task._id === id);
    task.completed = !task.completed;
    task.completedTimestamp = Date.now();
    console.log(task);
    this.tasksService
      .completeTask(task, id)
      .subscribe((response) => console.log(response));
  }

  sortByDate() {
    this.tasks.sort(function (a, b) {
      return Date.parse(a.dueDate) - Date.parse(b.dueDate);
    });
  }

  sortByPriority() {
    this.tasks.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }

  sortTasks(value: string) {
    if (value === 'date') {
      this.sortByDate();
    } else if (value === 'priority') {
      this.sortByPriority();
    }
  }

  filterCompleted() {
    if (!this.completedFilter) {
      this.tasks = this.tasks.filter((task) => !task.completed);
      this.completedFilter = !this.completedFilter;
    } else {
      this.getTasks();
      this.completedFilter = !this.completedFilter;
    }
  }
  logout() {
    localStorage.clear();
    this.authService.authentic = false;
    this.router.navigate(['login']);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
