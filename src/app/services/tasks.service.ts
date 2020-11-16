import { Injectable } from '@angular/core';
import { Task } from '../task';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksUrl = '/api/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks');
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(
      'http://localhost:3000/tasks',
      task,
      this.httpOptions
    );
  }

  completeTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.tasksUrl, task, this.httpOptions);
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.tasksUrl}/${task.id}`, this.httpOptions);
  }
}
