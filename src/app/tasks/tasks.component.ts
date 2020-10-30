import { Component, OnInit } from '@angular/core';
import {Task} from "../task"
//import {TASKS} from "../TASKS"
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] 
  completedFilter: Boolean

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTasks();
    
  }
  getTasks() {
    this.tasksService.getTasks().subscribe(
      tasks => this.tasks = tasks.sort(function(a, b) {return (a.completed === b.completed)? 0 : a.completed? 1 : -1})
    )
  }
  deleteTask(task) {
    let index = this.tasks.indexOf(task)
    this.tasks.splice(index, 1);
    this.tasksService.deleteTask(task).subscribe()
  }
  markCompleted(id) {
    let task = this.tasks.find(task => task.id === id);
    task.completed = !task.completed;
    this.tasksService.completeTask(task).subscribe() 
  }

  sortByDate() {
    this.tasks.sort(function(a, b) {
      return Date.parse(a.dueDate) - Date.parse(b.dueDate)
    })
  }

  sortByPriority() {
    this.tasks.sort(function(a, b) {
      return a.priority - b.priority
    })
  }

  sortTasks(value: string) {
  
    if(value === "date") {
      this.sortByDate()
    } else if (value === "priority") {
      this.sortByPriority();
    }
  }

  filterCompleted() {
    if(!this.completedFilter){
    this.tasks = this.tasks.filter(task => !task.completed)
    this.completedFilter = !this.completedFilter;
    } else {
      this.getTasks();
      this.completedFilter = !this.completedFilter;
    }
  }
}
