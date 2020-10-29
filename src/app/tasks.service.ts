import { Injectable } from '@angular/core';
import {Task} from './task'
import { Observable, of } from "rxjs"

import { HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksUrl = "/api/tasks";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTasks():Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
  }
}
