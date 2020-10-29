import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  //tasks: Task[]
  priority;
  user = JSON.parse(localStorage.getItem('userInfo'))
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    //console.log(this.user)
  }

  createTask(task) {
    this.tasksService.createTask(task).subscribe
    (response => {
      //this.tasks.push(response)
      console.log(response)
    })
  }

  selectPriority(e) {
    this.priority = e;
    console.log(this.priority)
  }
}
